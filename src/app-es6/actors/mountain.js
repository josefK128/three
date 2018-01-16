System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Mountain;
    return {
        setters: [],
        execute: function () {
            exports_1("Mountain", Mountain = {
                create: (options) => {
                    console.log(`line.create() options= `);
                    console.dir(options);
                    var shape = new THREE.Shape(), mountain_g, mountain_m, mountain, subset = [], vertices = new Float32Array(3 * options['xpositions'].length), nvertices = vertices.length, xpositions = options['xpositions'], nxpositions = xpositions.length, data = options['data'], color = options['color'] || 'yellow', k = 3, 
                    promise = new Promise((resolve, reject) => {
                        try {
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
                            shape.moveTo(0, 0);
                            for (let i = 0; i < nxpositions; i++) {
                                shape.lineTo(xpositions[i], subset[i]);
                            }
                            shape.lineTo(xpositions[nxpositions - 1], 0);
                            shape.lineTo(0, 0);
                            mountain_g = new THREE.ShapeBufferGeometry(shape);
                            mountain_m = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.4 });
                            mountain = new THREE.Mesh(mountain_g, mountain_m);
                            resolve(mountain);
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

