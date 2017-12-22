System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Line;
    return {
        setters: [],
        execute: function () {
            exports_1("Line", Line = {
                create: (options = {
                        max_vertices: 200,
                        drawCount: 3,
                        color: 0xff0000,
                        linewidth: 10,
                        vertices: [0, 0, 0, -3, 4, 0, -6, 1, 0]
                    }) => {
                    console.log(`line.create() options= `);
                    console.dir(options);
                    var line_g, line_m, positions, drawCount, line, count = 0, flag = true, promise = new Promise((resolve, reject) => {
                        try {
                            line_g = new THREE.BufferGeometry();
                            console.log(`line: linewidth = ${options.linewidth}`);
                            line_m = new THREE.LineBasicMaterial(options.color, options.linewidth);
                            positions = new Float32Array(options.max_vertices * 3);
                            line_g.addAttribute('position', new THREE.BufferAttribute(positions, 3));
                            drawCount = options.drawCount;
                            line_g.setDrawRange(0, drawCount);
                            line = new THREE.Line(line_g, line_m);
                            positions = line.geometry.attributes.position.array;
                            for (let i = 0; i < options.vertices.length; i++) {
                                positions[i] = options.vertices[i];
                            }
                            for (let i = options.vertices.length; i < options.max_vertices * 3;) {
                                positions[i++] = -i;
                                positions[i++] = 8.0 * Math.random();
                                positions[i++] = 0.0;
                            }
                            line.geometry.attributes.position.needsUpdate = true;
                            line['render'] = (options = { color: 0x00ff00 }) => {
                                if (count++ % 1000 === 1) {
                                    if (flag = !flag) {
                                        line_m.color = new THREE.Color(0x00ff00);
                                    }
                                    else {
                                        line_m.color = new THREE.Color(0xff0000);
                                    }
                                }
                            };
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

