System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var quad, scale, count, flag, Quad;
    return {
        setters: [],
        execute: function () {
            scale = 1.0, count = 0, flag = true;
            exports_1("Quad", Quad = {
                create: (options = {
                        width: 1.0,
                        height: 1.0,
                        x: 0.0,
                        y: 0.0,
                        z: -0.5,
                        color: new THREE.Color(0x0000ff),
                    }) => {
                    console.log(`quad.create() options= `);
                    console.dir(options);
                    var quad_g, quad_m, vertex = new THREE.Vector3(), vertices = new Float32Array([
                        -1.0, -1.0, 0.0,
                        1.0, -1.0, 0.0,
                        1.0, 1.0, 0.0,
                        1.0, 1.0, 0.0,
                        -1.0, 1.0, 0.0,
                        -1.0, -1.0, 0.0
                    ]), promise = new Promise((resolve, reject) => {
                        try {
                            quad_g = new THREE.BufferGeometry();
                            quad_g.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                            quad_m = new THREE.MeshBasicMaterial({ color: options.color, side: THREE.DoubleSide });
                            quad = new THREE.Mesh(quad_g, quad_m);
                            quad.position.x = options.x;
                            quad.position.y = options.y;
                            quad.position.z = options.z;
                            quad['render'] = (options = { color: 0x00ff00 }) => {
                                if (count++ % 1000 === 1) {
                                    if (flag = !flag) {
                                        quad_m.color = new THREE.Color(0x00ff00);
                                    }
                                    else {
                                        quad_m.color = new THREE.Color(0xff0000);
                                    }
                                }
                            }; 
                            resolve(quad);
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

