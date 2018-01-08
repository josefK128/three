System.register(["../actors/grid", "../actors/axes", "../actors/ohlc", "../actors/line", "../actors/sprite", "../actors/quad", "../actors/quad_shm"], function (exports_1, context_1) {
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
    var grid_1, axes_1, ohlc_1, line_1, sprite_1, quad_1, quad_shm_1, graphics, config, gl, renderer, stats, clock, et, count, camera, lookAt, light, scene, stage, layers, nLayers, layerDelta, actors, onWindowResize, Graphics;
    return {
        setters: [
            function (grid_1_1) {
                grid_1 = grid_1_1;
            },
            function (axes_1_1) {
                axes_1 = axes_1_1;
            },
            function (ohlc_1_1) {
                ohlc_1 = ohlc_1_1;
            },
            function (line_1_1) {
                line_1 = line_1_1;
            },
            function (sprite_1_1) {
                sprite_1 = sprite_1_1;
            },
            function (quad_1_1) {
                quad_1 = quad_1_1;
            },
            function (quad_shm_1_1) {
                quad_shm_1 = quad_shm_1_1;
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
                init(_config) {
                    config = _config;
                    if (Stats) {
                        stats = new Stats();
                        document.body.appendChild(stats.domElement);
                    }
                    renderer = graphics.renderer(document.getElementById('space'));
                    renderer.setClearColor(0xffffff, 1);
                    console.log(`config.camera = `);
                    console.dir(config.camera);
                    camera = graphics.camera(config.camera);
                    light.position.set(0, 10, 20);
                    camera.add(light);
                    lookAt = config.camera.lookAt;
                    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
                    camera['initial_position'] = config.camera.position;
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
                    }
                    return scene;
                } 
                camera(camera_config) {
                    var fov, w, h, aspect, near, far, position;
                    if (camera === undefined) {
                        fov = camera_config['fov'];
                        w = window.innerWidth;
                        h = window.innerHeight;
                        aspect = w / h;
                        near = camera_config['near'];
                        far = camera_config['far'];
                        position = camera_config['position'];
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
                layer(i = 0) {
                    return layers[i];
                }
                layer_type(l, type) {
                    console.log(`graphics.layer_type(${l}, ${type})`);
                    config.stage.layer_type[l] = type;
                    if (type === 'invisible') {
                        console.log(`setting layers[${l}].visible = false`);
                        layers[l].visible = false;
                    }
                    else {
                        console.log(`TBD: loading data for type = ${type} - currently 'line'`);
                        console.log(`setting layers[${l}].visible = true`);
                        layers[l].visible = true;
                    }
                }
                create(type, name, layer, options) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var grid, axes, past_ray, recent_ray, sprite, line, quad, 
                        quad_shm; 
                        try {
                            switch (type) {
                                case 'grid':
                                    grid = yield grid_1.Grid.create(options); 
                                    console.log(`grid = ${grid}`);
                                    graphics.addActor(name, grid, options);
                                    grid.position.z = -layer * layerDelta;
                                    layers[layer].add(grid);
                                    break;
                                case 'axes':
                                    axes = yield axes_1.Axes.create(options); 
                                    graphics.addActor(name, axes, options);
                                    axes.position.z = -layer * layerDelta;
                                    layers[layer].add(axes);
                                    break;
                                case 'ohlc':
                                    ohlc_1.Ohlc.create(-layer * layerDelta, layers[layer], options)
                                        .then((tuple) => {
                                        past_ray = `${options['symbol']}${layer}_past`;
                                        recent_ray = `${options['symbol']}${layer}_recent`;
                                        console.log(`past_ray = ${past_ray}`);
                                        console.log(`recent_ray = ${recent_ray}`);
                                        graphics.addActor(past_ray, tuple['past'], options);
                                        graphics.addActor(recent_ray, tuple['recent'], options);
                                    });
                                    break;
                                case 'sprite':
                                    sprite = yield sprite_1.Sprite.create(options); 
                                    graphics.addActor(name, sprite, options);
                                    sprite.position.z = -layer * layerDelta;
                                    layers[layer].add(sprite);
                                    break;
                                case 'line':
                                    line = yield line_1.Line.create(options); 
                                    graphics.addActor(name, line, options);
                                    line.position.z = -layer * layerDelta;
                                    layers[layer].add(line);
                                    break;
                                case 'quad':
                                    quad = yield quad_1.Quad.create(options); 
                                    graphics.addActor(name, quad, options);
                                    quad.position.z = -layer * layerDelta;
                                    layers[layer].add(quad);
                                    break;
                                case 'quad_shm':
                                    quad_shm = yield quad_shm_1.Quad_shm.create(options); 
                                    graphics.addActor(name, quad_shm, options);
                                    quad_shm.position.z = -layer * layerDelta;
                                    layers[layer].add(quad_shm);
                                    break;
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
                    actor['name'] = name;
                    actor['userData'] = options;
                    actors[name] = actor;
                }
                removeActor(name) {
                    var filtered_actors;
                    console.log(`removeActor: name = ${name}`);
                    console.log(`before removal of ${name} actors = `);
                    for (let nm of Object.keys(actors)) {
                        console.log(`actors contains name ${nm}`);
                    }
                    if (actors[name]) {
                        console.log(`removeActor: name = ${name}`);
                        delete actors[name];
                        console.log(`after removal of ${name} actors = `);
                        console.dir(actors);
                    }
                    else {
                        console.log(`actor with name = ${name} not found!`);
                    }
                }
                actors() {
                    return actors;
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
                        actors[actor].scale.set(sx, sy, sz);
                    }
                }
                dollyX(tx = camera.position.x) {
                    let ty = camera.position.y;
                    camera.position.set(tx, ty, camera.position.z);
                    lookAt.x = tx;
                    lookAt.y = ty;
                    camera.lookAt(tx, ty, 0.0);
                } 
                dollyY(ty = camera.position.y) {
                    let tx = camera.position.x;
                    camera.position.set(tx, ty, camera.position.z);
                    lookAt.x = tx;
                    lookAt.y = ty;
                    camera.lookAt(tx, ty, 0.0);
                } 
                pan(p) {
                    camera.rotation.y = p;
                    camera.updateProjectionMatrix();
                }
                tilt(t) {
                    camera.rotation.x = t;
                    camera.updateProjectionMatrix();
                }
                zoom(_fov) {
                    camera.fov = _fov;
                    camera.updateProjectionMatrix();
                }
            }; 
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

