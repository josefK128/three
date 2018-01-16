System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Study;
    return {
        setters: [],
        execute: function () {
            exports_1("Study", Study = {
                create: (options) => {
                    console.log(`line.create() options= `);
                    console.dir(options);
                    var line_g, subset = [], vertices = new Float32Array(3 * options['xpositions'].length), 
                    nvertices = vertices.length, xpositions = options['xpositions'], nxpositions = xpositions.length, data = options['data'], line_m, color = options['color'] || 'blue', linewidth = options['linewidth'] || 5, line, k = 3, 
                    promise = new Promise((resolve, reject) => {
                        try {
                            line_g = new THREE.BufferGeometry();
                            line_m = new THREE.LineBasicMaterial({ color: color, linewidth: linewidth, visible: true });
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
                            console.log(`nvertices = ${nvertices}`);
                            console.log(`subset.length = ${subset.length}`);
                            console.log(`nxpositions = ${nxpositions}`);
                            for (let i = 0; i < nxpositions; i++) {
                                vertices[3 * i] = xpositions[i];
                                vertices[3 * i + 1] = subset[i];
                                vertices[3 * i + 2] = 0.0;
                            }
                            line_g.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                            console.log(`line_g.attribute`);
                            line_g.setDrawRange(0, subset.length);
                            line = new THREE.Line(line_g, line_m);
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

