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
                    console.log(`options['data'].length = ${options['data'].length / 4}`);
                    var symbol = options['symbol'], nglyphs = options['data'].length / 4, first_dynamic_index = options['first_dynamic_index'] || 0, width = options['width'] || 2.0, xpositions = options['xpositions'], data = options['data'], 
                    halfwidth = width * 0.5, quad_depth = depth - 0.01, quadOC_depth = depth - 0.02, 
                    past = [], recent = [], 
                    actor, open, high, low, close, 
                    last_static_index = first_dynamic_index + 1, dhl, 
                    yhl, 
                    glyph_color, 
                    quad_g, quad_m, quad, 
                    vertices, quadO_g, quadO_m, quadO, 
                    quadC_g, quadC_m, quadC, promise = new Promise((resolve, reject) => {
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
                                quad_g = new THREE.PlaneBufferGeometry(width, dhl);
                                quad_m = new THREE.MeshBasicMaterial({ color: glyph_color, transparent: false });
                                quad = new THREE.Mesh(quad_g, quad_m);
                                quad.position.y = yhl;
                                quad.position.z = quad_depth;
                                actor.add(quad);
                                quadO_g = new THREE.PlaneBufferGeometry(width, width);
                                quadO_m = new THREE.MeshBasicMaterial({ color: glyph_color, transparent: false });
                                quadO = new THREE.Mesh(quadO_g, quadO_m);
                                quadO.position.x = -halfwidth;
                                quadO.position.y = open;
                                quadO.position.z = quadOC_depth;
                                actor.add(quadO);
                                quadC_g = new THREE.PlaneBufferGeometry(width, width);
                                quadC_m = new THREE.MeshBasicMaterial({ color: glyph_color, transparent: false });
                                quadC = new THREE.Mesh(quadC_g, quadC_m);
                                quadC.position.x = halfwidth;
                                quadC.position.y = close;
                                quadC.position.z = quadOC_depth;
                                actor.add(quadC);
                                actor.position.x = xpositions[i];
                                actor.name = `${symbol}${i}`;
                                layer.add(actor);
                                if (i <= first_dynamic_index) {
                                    recent[first_dynamic_index - i] = actor;
                                }
                                else {
                                    past[i - last_static_index] = actor;
                                }
                            } 
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

