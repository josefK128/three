System.register(["../shaders/vsh_vertices.glsl", "../shaders/fsh_color.glsl"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vsh_vertices_glsl_1, fsh_color_glsl_1, fsh_color_glsl_2, quad, vertices, count, flag, Quad_shm;
    return {
        setters: [
            function (vsh_vertices_glsl_1_1) {
                vsh_vertices_glsl_1 = vsh_vertices_glsl_1_1;
            },
            function (fsh_color_glsl_1_1) {
                fsh_color_glsl_1 = fsh_color_glsl_1_1;
                fsh_color_glsl_2 = fsh_color_glsl_1_1;
            }
        ],
        execute: function () {
            vertices = new Float32Array([
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, -1.0, 0.0
            ]), count = 0, flag = true;
            exports_1("Quad_shm", Quad_shm = {
                create: (options = {
                        width: 1.0,
                        height: 1.0,
                        x: 0.0,
                        y: 6.0,
                        z: 0.0,
                        color_gain: new THREE.Color(0x00ff00),
                        color_loss: new THREE.Color(0xff0000) 
                    }) => {
                    console.log(`Quad_shm.create() options= `);
                    console.dir(options);
                    var quad_g, quad_m, promise = new Promise((resolve, reject) => {
                        try {
                            quad_g = new THREE.BufferGeometry();
                            quad_g.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                            quad_m = new THREE.ShaderMaterial({
                                vertexShader: vsh_vertices_glsl_1.vsh,
                                fragmentShader: fsh_color_glsl_1.fsh,
                                uniforms: fsh_color_glsl_2.uniforms,
                                side: THREE.DoubleSide
                            });
                            quad = new THREE.Mesh(quad_g, quad_m);
                            quad.position.set(options.x, options.y, options.z);
                            console.log(`quad_shm1.position = ${quad.position.toArray()}`);
                            quad['render'] = () => {
                                if (count++ % 1000 === 1) {
                                    if (flag = !flag) {
                                        quad.material.uniforms.uColor.value = options.color_loss;
                                        quad.geometry.attributes.position.array = new Float32Array([
                                            -1.0, -0.5, 0.0,
                                            1.0, -0.5, 0.0,
                                            1.0, 0.5, 0.0,
                                            1.0, 0.5, 0.0,
                                            -1.0, 0.5, 0.0,
                                            -1.0, -0.5, 0.0
                                        ]);
                                    }
                                    else {
                                        quad.material.uniforms.uColor.value = options.color_gain;
                                        quad.geometry.attributes.position.array = new Float32Array([
                                            -1.0, -1.0, 0.0,
                                            1.0, -1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            1.0, 1.0, 0.0,
                                            -1.0, 1.0, 0.0,
                                            -1.0, -1.0, 0.0
                                        ]);
                                    }
                                    quad.geometry.attributes.position.needsUpdate = true;
                                    quad.material.uniforms.uColor.needsUpdate = true;
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

