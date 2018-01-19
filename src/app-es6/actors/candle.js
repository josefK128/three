System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Candle;
    return {
        setters: [],
        execute: function () {
            exports_1("Candle", Candle = {
                create: (depth, layer, deltaX, options) => {
                    console.log(`candle.create() depth=${depth} layer=${layer} deltaX=${deltaX}  options= `);
                    console.dir(options);
                    console.log(`options['data'].length = ${options['data'].length / 4}`);
                    var symbol = options['symbol'], nglyphs = options['data'].length / 4, first_dynamic_index = options['first_dynamic_index'] || 0, 
                    width = deltaX * 0.4, xpositions = options['xpositions'], data = options['data'], 
                    doublewidth = 2.0 * width, quad_depth = depth - 0.01, 
                    past = [], recent = [], 
                    actor, open, high, low, close, 
                    last_static_index = first_dynamic_index + 1, center, centerH, centerL, heightH, heightL, doc, 
                    doubleWidth, 
                    glyph_color, 
                    quad_g, quad_m, quad, 
                    vertices, quadH_g, quadH_m, quadH, 
                    quadL_g, quadL_m, quadL, promise = new Promise((resolve, reject) => {
                        try {
                            for (let i = 0; i < nglyphs; i++) {
                                actor = new THREE.Group();
                                open = data[4 * i];
                                high = data[4 * i + 1];
                                low = data[4 * i + 2];
                                close = data[4 * i + 3];
                                center = 0.5 * (open + close);
                                centerH = 0.5 * (high + Math.max(open, close));
                                centerL = 0.5 * (low + Math.min(open, close));
                                doc = (open > close) ? Math.max(1.0, (open - close)) : Math.max(1.0, (close - open));
                                glyph_color = open > close ? 'red' : 'green';
                                quad_g = new THREE.PlaneBufferGeometry(doublewidth, doc);
                                quad_m = new THREE.MeshBasicMaterial({ color: glyph_color, transparent: false });
                                quad = new THREE.Mesh(quad_g, quad_m);
                                quad.position.y = center;
                                quad.position.z = quad_depth;
                                actor.add(quad);
                                heightH = high - Math.max(open, close);
                                heightH = Math.max(heightH, 1.0); 
                                quadH_g = new THREE.PlaneBufferGeometry(width, heightH);
                                quadH_m = new THREE.MeshBasicMaterial({ color: glyph_color, transparent: false });
                                quadH = new THREE.Mesh(quadH_g, quadH_m);
                                quadH.position.y = centerH;
                                quadH.position.z = quad_depth;
                                actor.add(quadH);
                                heightL = Math.min(open, close) - low;
                                quadL_g = new THREE.PlaneBufferGeometry(width, heightL);
                                quadL_m = new THREE.MeshBasicMaterial({ color: glyph_color, transparent: false });
                                quadL = new THREE.Mesh(quadL_g, quadL_m);
                                quadL.position.y = centerL;
                                quadL.position.z = quad_depth;
                                actor.add(quadL);
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

