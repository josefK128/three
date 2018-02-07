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
                            line_g = new THREE.Geometry();
                            line_m = new THREE.MeshBasicMaterial({ color: lineColor, visible: true });
                            line_m.side = THREE.DoubleSide;
                            border_g = new THREE.Geometry();
                            border_m = new THREE.MeshBasicMaterial({ color: borderColor, visible: true });
                            border_m.side = THREE.DoubleSide;
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
                            for (let i = 0; i < nxpositions; i += 2) {
                                console.log(`i = ${i}`);
                                console.log(`xpositions[${i}] = ${xpositions[i]}`);
                                console.log(`subset[${i}] = ${subset[i]}`);
                                line_g.vertices.push(new THREE.Vector3(xpositions[i], subset[i] + linewidthD2, 0.0));
                                line_g.vertices.push(new THREE.Vector3(xpositions[i], subset[i] - linewidthD2, 0.0));
                                console.log(`xpositions[${i + 1}] = ${xpositions[i + 1]}`);
                                console.log(`subset[${i + 1}] = ${subset[i + 1]}`);
                                line_g.vertices.push(new THREE.Vector3(xpositions[i + 1], subset[i + 1] + linewidthD2, 0.0));
                                line_g.vertices.push(new THREE.Vector3(xpositions[i + 1], subset[i + 1] - linewidthD2, 0.0));
                            }
                            console.log(`@@@@ line_g = ${line_g}`);
                            line = new THREE.Mesh(line_g, line_m);
                            console.log(`@@@@ line = ${line}`);
                            line.visible = true;
                            console.log(`line:`);
                            console.dir(line);
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

