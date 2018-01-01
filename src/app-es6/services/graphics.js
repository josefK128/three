System.register(["../actors/grid", "../actors/axes", "../actors/line", "../actors/quad", "../actors/quad_shm", "../actors/sprite"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __moduleName = context_1 && context_1.id;
    var grid_1, axes_1, line_1, quad_1, quad_shm_1, sprite_1, graphics, gl, renderer, stats, clock, et, count, camera, lookAt, controls, light, scene, stage, layers, nLayers, layerDelta, actors, onWindowResize, Graphics;
    return {
        setters: [
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (axes_1_1) {
                axes_1 = axes_1_1;
            },
            function (line_1_1) {
                line_1 = line_1_1;
            },
            function (quad_1_1) {
                quad_1 = quad_1_1;
            },
            function (quad_shm_1_1) {
                quad_shm_1 = quad_shm_1_1;
            },
            function (sprite_1_1) {
                sprite_1 = sprite_1_1;
            }
        ],
        execute: function () {
            clock = new THREE.Clock(), et = 0, count = 0, light = new THREE.PointLight(), layers = [], actors = {}, onWindowResize = () => {
                let w = window.innerWidth, h = window.innerHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            };
            Graphics = class Graphics {
                init(config) {
                    if (Stats) {
                        stats = new Stats();
                        document.body.appendChild(stats.domElement);
                    }
                    renderer = graphics.renderer(document.getElementById('space'));
                    renderer.setClearColor(0xffffff, 1);
                    camera = graphics.camera(config.camera);
                    light.position.set(0, 10, 20);
                    camera.add(light);
                    controls = new THREE.OrbitControls(camera);
                    lookAt = config.camera.lookAt;
                    controls.target.set(lookAt.x, lookAt.y, lookAt.z);
                    nLayers = config.stage.layers.length;
                    layerDelta = config.stage.layerDelta;
                    scene = graphics.scene();
                    window.addEventListener('resize', onWindowResize, false);
                } 
                animate() {
                    et = clock.getElapsedTime();
                    requestAnimationFrame(graphics.animate);
                    for (let actor of Object.keys(actors)) {
                        if (actors[actor].render) {
                            actors[actor].render();
                        }
                    }
                    if (stats) {
                        stats.update();
                    }
                    controls.update();
                    renderer.render(scene, camera);
                }
                scene() {
                    if (scene === undefined) {
                        scene = new THREE.Scene();
                        stage = new THREE.Group();
                        actors['stage'] = stage;
                        scene.add(stage);
                        let d = camera.position.z;
                        console.log(`\n^^^ graphics.scene(): camera.position.z = ${d}`);
                        console.log(`\n^^^ graphics.scene(): nLayers = ${nLayers}`);
                        for (let i = 0; i < nLayers; i++) {
                            let s = (d + layerDelta * i) / d;
                            console.log(`^^^ graphics.scene():layer[${i}] scale s = ${s}`);
                            layers[i] = new THREE.Group();
                            layers[i].scale.set(s, s, 1.0);
                            stage.add(layers[i]);
                        }
                        console.log(`\nactors:`);
                        return scene;
                    }
                } 
                camera(camera_config) {
                    var fov = camera_config['fov'], w = window.innerWidth, h = window.innerHeight, aspect = w / h, near = camera_config['near'], far = camera_config['far'], position = camera_config['position'], lookAt = camera_config['lookAt'];
                    if (camera === undefined) {
                        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
                        camera['position'].x = camera_config['position'].x;
                        camera['position'].y = camera_config['position'].y;
                        camera['position'].z = camera_config['position'].z;
                    }
                    return camera;
                }
                renderer(canvas, width = window.innerWidth, height = window.innerHeight) {
                    if (renderer === undefined) {
                        renderer = new THREE.WebGLRenderer({ canvas: canvas });
                        renderer.setPixelRatio(window.devicePixelRatio);
                        renderer.setSize(window.innerWidth, window.innerHeight);
                        gl = canvas['getContext']('webgl');
                    }
                    renderer.setSize(width, height);
                    return renderer;
                }
                getCurrentWebGLProgram() {
                    return gl.getParameter(gl.CURRENT_PROGRAM);
                }
                create(type, name, layer, options) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var grid, axes, line, quad, 
                        quad_shm, 
                        sprite;
                        try {
                            switch (type) {
                                case 'grid':
                                    grid = yield grid_1.Grid.create(options); 
                                    console.log(`grid = ${grid}`);
                                    graphics.addActor(name, grid, options);
                                    grid.position.z = -layer * layerDelta;
                                    layers[layer].add(grid);
                                    return grid;
                                case 'axes':
                                    axes = yield axes_1.Axes.create(options); 
                                    graphics.addActor(name, axes, options);
                                    axes.position.z = -layer * layerDelta;
                                    layers[layer].add(axes);
                                    return axes;
                                case 'quad':
                                    quad = yield quad_1.Quad.create(options); 
                                    graphics.addActor(name, quad, options);
                                    quad.position.z = -layer * layerDelta;
                                    layers[layer].add(quad);
                                    return quad;
                                case 'quad_shm':
                                    quad_shm = yield quad_shm_1.Quad_shm.create(options); 
                                    graphics.addActor(name, quad_shm, options);
                                    quad_shm.position.z = -layer * layerDelta;
                                    layers[layer].add(quad_shm);
                                    return quad_shm;
                                case 'sprite':
                                    sprite = yield sprite_1.Sprite.create(options); 
                                    graphics.addActor(name, sprite, options);
                                    sprite.position.z = -layer * layerDelta;
                                    layers[layer].add(sprite);
                                    return sprite;
                                case 'line':
                                    line = yield line_1.Line.create(options); 
                                    graphics.addActor(name, line, options);
                                    line.position.z = -layer * layerDelta;
                                    layers[layer].add(line);
                                    return line;
                                default:
                                    console.log(`%%% failed to create actor of type ${type}`);
                            }
                        }
                        catch (e) {
                            console.log(`%%% error creating actor of type ${type}: ${e}`);
                        }
                    });
                } 
                addActor(name, actor, options) {
                    actor.name = name;
                    actor.userData = options;
                    actors[name] = actor;
                }
                actor(name) {
                    if (actors[name]) {
                        return actors[name];
                    }
                    else {
                        console.log(`actor with name = ${name} does NOT exist!`);
                    }
                }
                scaleActor(actor, sx, sy, sz) {
                    if (actors[actor]) {
                        console.log(`%%% scaling actor = ${actor} sx=${sx} sy=${sy} sz=${sz}`);
                        actors[actor].scale.set(sx, sy, sz);
                        if (actor === 'stage') {
                            actors['grid1'].scale.set(sx, sz, sy);
                        }
                    }
                }
                dollyX(tx = 0.0, ty = 0.0) {
                    let cp = camera.position;
                    camera.translateX(tx);
                    lookAt.x += tx;
                    controls.target.set(lookAt.x, lookAt.y, lookAt.z);
                    console.log(`camera now located at [${cp.x}, ${cp.y}, ${cp.z}]`);
                    console.log(`camera looking at [${lookAt.x}, ${lookAt.y}, ${lookAt.z}]`);
                } 
            }; 
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

