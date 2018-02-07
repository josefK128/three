System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Line;
    return {
        setters: [],
        execute: function () {
            exports_1("Line", Line = {
                create: (options) => {
                    console.log(`line.create() options= `);
                    console.dir(options);
                    var group = new THREE.Group(), line_g, line_m, line, lineA_g, lineA_m, lineA, lineB_g, lineB_m, lineB, vertices = new Float32Array(3 * options['xpositions'].length), verticesA = new Float32Array(3 * options['xpositions'].length), verticesB = new Float32Array(3 * options['xpositions'].length), 
                    subset = [], nvertices = vertices.length, xpositions = options['xpositions'], nxpositions = xpositions.length, data = options['data'], linecolor = options['color'] || 'red', linewidth = options['linewidth'] || 4, linewidthD2 = 0.5 * linewidth, borderwidth = options['borderwidth'] || 6, borderwidthD2 = 0.5 * borderwidth, k = 3, 
                    promise = new Promise((resolve, reject) => {
                        try {
                            line_g = new THREE.BufferGeometry();
                            line_m = new THREE.LineBasicMaterial({ color: linecolor, visible: true });
                            lineA_g = new THREE.BufferGeometry();
                            lineA_m = new THREE.LineBasicMaterial({ color: linecolor, visible: true });
                            lineB_g = new THREE.BufferGeometry();
                            lineB_m = new THREE.LineBasicMaterial({ color: linecolor, visible: true });
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
                                if (linewidth > 0) {
                                    verticesA[3 * i] = xpositions[i];
                                    verticesA[3 * i + 1] = subset[i] + linewidthD2;
                                    verticesA[3 * i + 2] = 0.0;
                                    verticesB[3 * i] = xpositions[i];
                                    verticesB[3 * i + 1] = subset[i] - linewidthD2;
                                    verticesB[3 * i + 2] = 0.0;
                                }
                            }
                            line_g.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                            line_g.setDrawRange(0, subset.length);
                            line = new THREE.Line(line_g, line_m);
                            line.visible = true;
                            console.log(`line`);
                            line.geometry.attributes.position.needsUpdate = true;
                            console.log(`line_g.attributes.needsUpdate = true`);
                            group.add(line);
                            if (linewidth > 0) {
                                lineA_g.addAttribute('position', new THREE.BufferAttribute(verticesA, 3));
                                lineB_g.addAttribute('position', new THREE.BufferAttribute(verticesB, 3));
                                lineA_g.setDrawRange(0, subset.length);
                                lineB_g.setDrawRange(0, subset.length);
                                lineA = new THREE.Line(lineA_g, lineA_m);
                                lineA.visible = true;
                                console.log(`lineA`);
                                lineA.geometry.attributes.position.needsUpdate = true;
                                console.log(`lineA_g.attributes.needsUpdate = true`);
                                lineB = new THREE.Line(lineB_g, lineB_m);
                                lineB.visible = true;
                                console.log(`lineB`);
                                lineB.geometry.attributes.position.needsUpdate = true;
                                console.log(`lineB_g.attributes.needsUpdate = true`);
                                group.add(lineA);
                                group.add(lineB);
                            }
                            resolve(group);
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

