System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var QuadLine;
    return {
        setters: [],
        execute: function () {
            exports_1("QuadLine", QuadLine = {
                create: (options) => {
                    console.log(`quadline.create() options= `);
                    console.dir(options);
                    var line_g, line_m, line, border_g, border_m, border, linewidth = options['linewidth'] || 6, borderwidth = options['borderwidth'] || 10, linewidthD2 = .5 * linewidth, borderwidthD2 = .5 * borderwidth, lineZ = 0.0, borderZ = 0.001, lineColor = options['lineColor'] || 'red', borderColor = options['borderColor'] || 'green', subset = [], 
                    lvertices = new Float32Array(6 * options['xpositions'].length), bvertices = new Float32Array(6 * options['xpositions'].length), xpositions = options['xpositions'], nxpositions = xpositions.length, data = options['data'], k = 3, 
                    promise = new Promise((resolve, reject) => {
                        try {
                            line_g = new THREE.BufferGeometry();
                            line_m = new THREE.MeshBasicMaterial({ color: lineColor, visible: true });
                            border_g = new THREE.BufferGeometry();
                            border_m = new THREE.MeshBasicMaterial({ color: borderColor, visible: true });
                            if (options['subset'] === 'Op') {
                                k = 0;
                            }
                            if (options['subset'] === 'H') {
                                k = 1;
                            }
                            if (options['subset'] === 'L') {
                                k = 2;
                            }
                            if (options['subset'] === 'C') {
                                k = 3;
                            }
                            console.log(`options['subset'] = ${options['subset']} k = ${k}`);
                            for (let i = 0; i < data.length; i++) {
                                let j = Math.floor(i / 4.0);
                                if (i % 4 === k) {
                                    subset[j] = data[i];
                                }
                            }
                            console.log(`subset.length = ${subset.length}`);
                            console.log(`nxpositions = ${nxpositions}`);
                            for (let i = 0; i < nxpositions; i++) {
                                lvertices[6 * i] = xpositions[i];
                                lvertices[6 * i + 1] = subset[i] + linewidthD2;
                                lvertices[6 * i + 2] = lineZ;
                                lvertices[6 * i + 3] = xpositions[i];
                                lvertices[6 * i + 4] = subset[i] - linewidthD2;
                                lvertices[6 * i + 5] = lineZ;
                            }
                            line_g.addAttribute('position', new THREE.BufferAttribute(lvertices, 6));
                            console.log(`line_g.attribute`);
                            line_g.setDrawRange(0, 2 * subset.length);
                            line = new THREE.Mesh(line_g, line_m);
                            line.visible = true;
                            console.log(`line`);
                            line.geometry.attributes.position.needsUpdate = true;
                            console.log(`line_g.attributes.needsUpdate = true`);
                            resolve(line);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    return promise;
                } 
            });
        }
    };
});

