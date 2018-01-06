System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Ohlc;
    return {
        setters: [],
        execute: function () {
            exports_1("Ohlc", Ohlc = {
                create: (depth, layer, options) => {
                    console.log(`ohlc.create() depth=${depth} layer=${layer} options= `);
                    console.dir(options);
                    var nglyphs = options['data'].length / 4, first_dynamic_index = options['first_dynamic_index'], last_static_index = first_dynamic_index + 1, xpositions = options['xpositions'], data = options['data'], past = [], recent = [], 
                    actor, open, high, low, close, 
                    dhl, yhl, glyph_color, 
                    quad_g, quad_m, quad, 
                    vertices, pointO_g, pointO_m, pointO, 
                    pointC_g, pointC_m, pointC, promise = new Promise((resolve, reject) => {
                        try {
                            for (let i = 0; i < nglyphs; i++) {
                                actor = new THREE.Group();
                                open = data[4 * i];
                                high = data[4 * i + 1];
                                low = data[4 * i + 2];
                                close = data[4 * i + 3];
                                dhl = Math.max(high - low, 1.0);
                                yhl = (high + low) * 0.5;
                                glyph_color = open > close ? 'red' : 'green';
                                quad_g = new THREE.PlaneBufferGeometry(0.2, dhl);
                                quad_m = new THREE.MeshBasicMaterial({ color: glyph_color, transparent: false });
                                quad = new THREE.Mesh(quad_g, quad_m);
                                quad.position.y = yhl;
                                quad.position.z = depth - 0.01;
                                actor.add(quad);
                                pointO_g = new THREE.BufferGeometry();
                                vertices = new Float32Array([
                                    -0.1, open, depth - 0.02
                                ]);
                                pointO_g.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                                pointO_m = new THREE.PointsMaterial({ size: 0.2, color: glyph_color,
                                    transparent: false, sizeAttenuation: true });
                                pointO = new THREE.Points(pointO_g, pointO_m);
                                actor.add(pointO);
                                pointC_g = new THREE.BufferGeometry();
                                vertices = new Float32Array([
                                    0.1, close, depth - 0.02
                                ]);
                                pointC_g.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                                pointC_m = new THREE.PointsMaterial({ size: 0.2, color: glyph_color,
                                    transparent: false, sizeAttenuation: true });
                                pointC = new THREE.Points(pointC_g, pointC_m);
                                actor.add(pointC);
                                actor.position.x = xpositions[i];
                                layer.add(actor);
                                console.log(`ohlc for-loop: i = ${i}`);
                                console.log(`actor[${i}].position.x = ${actor.position.x}`);
                                if (i <= first_dynamic_index) {
                                    console.log(`ohlc: recent[${first_dynamic_index - i}] = ${actor}`);
                                    recent[first_dynamic_index - i] = actor;
                                }
                                else {
                                    console.log(`ohlc: past[${i - last_static_index}] = ${actor}`);
                                    past[i - last_static_index] = actor;
                                }
                            } 
                            console.log(`ohlc: - past:`);
                            console.dir(past);
                            console.log(`ohlc - recent:`);
                            console.dir(recent);
                            resolve({ past: past, recent: recent });
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

