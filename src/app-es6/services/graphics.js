System.register(["../actors/grid", "../actors/axes", "../actors/ohlc", "../actors/candle", "../actors/quadline", "../actors/line", "../actors/mountain", "../actors/study", "../actors/sprite", "../actors/quad", "../actors/quad_shm"], function (exports_1, context_1) {
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
    var grid_1, axes_1, ohlc_1, candle_1, quadline_1, line_1, mountain_1, study_1, sprite_1, quad_1, quad_shm_1, graphics, config, gl, renderer, stats, clock, grid, axes, et, count, camera, lookAt, light, scene, stage, layers, nLayers, layerDelta, layersGlobal2Local, deltaX, actors, onWindowResize, Graphics;
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
            function (candle_1_1) {
                candle_1 = candle_1_1;
            },
            function (quadline_1_1) {
                quadline_1 = quadline_1_1;
            },
            function (line_1_1) {
                line_1 = line_1_1;
            },
            function (mountain_1_1) {
                mountain_1 = mountain_1_1;
            },
            function (study_1_1) {
                study_1 = study_1_1;
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
                    camera.position.x = config.camera.position.x;
                    camera.position.y = config.camera.position.y;
                    camera.position.z = config.camera.position.z;
                    lookAt = config.camera.lookAt;
                    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
                    camera['initial_position'] = config.camera.position;
                    nLayers = config.stage.layers.length;
                    scene = graphics.scene();
                    layersGlobal2Local = 0;
                    layerDelta = config.stage.layerDelta; 
                    deltaX = config.stage.deltaX; 
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
                            console.log(`^^^ graphics.scene():create/add layer[${i}] to stage`);
                            layers[i] = new THREE.Group();
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
                layer_type(l, type, options = {}) {
                    var prev_type = config.stage.layer_type[l], flag = true;
                    console.log(`\n\n*** graphics.layer_type(${l}, ${type})`);
                    console.log(`prev_type of layer[${l}] = ${prev_type})`);
                    config.stage.layer_type[l] = type;
                    if (prev_type === 'invisible') {
                        layers[l].visible = true;
                        return;
                    }
                    if (type === 'invisible') {
                        console.log(`setting layers[${l}].visible = false`);
                        layers[l].visible = false;
                    }
                    else {
                        console.log(`graphics.create(${type},${type}${l}, ${l}, options:`);
                        console.dir(options);
                        for (let i = 0; i < layers[l].children.length;) {
                            let actor = layers[l].children[i];
                            let actorname = actor.name || 'unknown';
                            if (!actorname.startsWith('grid') && !actorname.startsWith('axes')) {
                                layers[l].remove(actor);
                                if (prev_type === 'ohlc' || prev_type === 'candle') {
                                    console.log(`prev_type = ${prev_type} flag = ${flag}`);
                                    if (flag) {
                                        graphics.removeActor(`${actorname}_recent`);
                                        graphics.removeActor(`${actorname}_past`);
                                        flag = false;
                                    }
                                }
                                else {
                                    graphics.removeActor(actorname);
                                }
                            }
                            else {
                                i = i + 1;
                            }
                        }
                        console.log(`type = ${type}${l}`);
                        graphics.create(type, `${type}${l}`, l, options);
                        console.log(`setting layers[${l}].visible = true`);
                        layers[l].visible = true;
                    }
                } 
                create(type, name, layer, options) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var past_ray, recent_ray, line, quadline, mountain, study, sprite, quad, 
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
                                        console.log(`received tuple`);
                                        past_ray = `${options['symbol']}${layer}_past`;
                                        recent_ray = `${options['symbol']}${layer}_recent`;
                                        console.log(`past_ray = ${past_ray}`);
                                        console.log(`recent_ray = ${recent_ray}`);
                                        graphics.addActor(past_ray, tuple['past'], options);
                                        graphics.addActor(recent_ray, tuple['recent'], options);
                                    });
                                    break;
                                case 'candle':
                                    candle_1.Candle.create(-layer * layerDelta, layers[layer], options)
                                        .then((tuple) => {
                                        console.log(`received tuple`);
                                        past_ray = `${options['symbol']}${layer}_past`;
                                        recent_ray = `${options['symbol']}${layer}_recent`;
                                        console.log(`past_ray = ${past_ray}`);
                                        console.log(`recent_ray = ${recent_ray}`);
                                        graphics.addActor(past_ray, tuple['past'], options);
                                        graphics.addActor(recent_ray, tuple['recent'], options);
                                    });
                                    break;
                                case 'quadline':
                                    console.log(`@@@@ type = 'quadline'`);
                                    quadline = yield quadline_1.QuadLine.create(options);
                                    console.log(`@@@@ quadline = ${quadline}`);
                                    quadline.position.z = -layer * layerDelta;
                                    console.log(`@@@@ quadline.position.x = ${quadline.position.x}`);
                                    console.log(`@@@@ quadline.position.y = ${quadline.position.y}`);
                                    console.log(`@@@@ quadline.position.z = ${quadline.position.z}`);
                                    layers[layer].add(quadline);
                                    graphics.addActor(name, quadline, options);
                                    console.log(`after adding ${name} actors = ${Object.keys(actors)}`);
                                    break;
                                case 'line':
                                    line = yield line_1.Line.create(options);
                                    line.position.z = -layer * layerDelta;
                                    layers[layer].add(line);
                                    graphics.addActor(name, line, options);
                                    console.log(`after adding ${name} actors = ${Object.keys(actors)}`);
                                    break;
                                case 'mountain':
                                    console.log(`graphics.create(${type})`);
                                    mountain = yield mountain_1.Mountain.create(options);
                                    console.log(`graphics.create(${type}) mountain = ${mountain}`);
                                    mountain.position.z = -layer * layerDelta;
                                    layers[layer].add(mountain);
                                    graphics.addActor(name, mountain, options);
                                    console.log(`after adding ${name} actors = ${Object.keys(actors)}`);
                                    break;
                                case 'study':
                                    study = yield study_1.Study.create(options); 
                                    graphics.addActor(name, study, options);
                                    study.position.z = -layer * layerDelta;
                                    layers[layer].add(study);
                                    break;
                                case 'sprite':
                                    sprite = yield sprite_1.Sprite.create(options); 
                                    graphics.addActor(name, sprite, options);
                                    sprite.position.z = -layer * layerDelta;
                                    layers[layer].add(sprite);
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
                                case 'none':
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
                    if (actors[name]) {
                        delete actors[name];
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
                mod_recent(symbol, layer, type, options) {
                    var modified_glyphs = options['data'].length / 4, recent = graphics.actor(`${symbol}${layer}_recent`), modifications = Math.min(modified_glyphs, recent.length);
                    console.log(`\nmod_recent: symbol=${symbol} layer=${layer} type=${type}`);
                    console.log(`modififications = ${modifications}`);
                    console.log(`options:`);
                    console.dir(options);
                    console.log(`recent actor = ${recent}`);
                    console.log(`recent.length = ${recent.length}`);
                    for (let i = 0; i < recent.length; i++) {
                        console.log(`recent[${i}] instance of THREE.Group is ${recent[i] instanceof THREE.Group}`);
                    }
                    console.log(`options['data'].length = ${options['data'].length}`);
                    options['first_dynamic_index'] = options['data'].length / 4 - 1;
                    options['symbol'] = symbol;
                    console.log(`options['first_dynamic_index'] = ${options['first_dynamic_index']}`);
                    for (let i = 0; i < modifications; i++) {
                        console.log(`removing recent[${i}]`);
                        recent[i].parent.remove(recent[0]);
                    }
                    graphics.append(type, -layer * layerDelta, layer, layers[layer], recent, options);
                } 
                add_recent(symbol, layer, type, options) {
                    console.log(`\nadd_recent: symbol=${symbol} layer=${layer} type=${type}`);
                    console.log(`options:`);
                    console.dir(options);
                    let recent = graphics.actor(`${symbol}${layer}_recent`);
                    console.log(`recent actor = ${recent}`);
                    let xpl = options['xpositions'].length;
                    console.log(`xpositions.length = ${xpl}`);
                    for (let i = 0; i < layers.length; i++) {
                        layers[i].translateX(-deltaX * xpl);
                    }
                    grid.translateX(deltaX * xpl);
                    axes.translateX(deltaX * xpl);
                    layersGlobal2Local += deltaX * xpl;
                    console.log(`layersGlobal2Local = ${layersGlobal2Local}`);
                    for (let i = 0; i < xpl; i++) {
                        options['xpositions'][i] += layersGlobal2Local;
                    }
                    console.log(`local xpositions = ${options['xpositions']}`);
                    options['first_dynamic-index'] = options['data'].length / 4 - 1;
                    options['symbol'] = symbol;
                    graphics.append(type, -layer * layerDelta, layer, layers[layer], recent, options);
                } 
                add_past(symbol, layer, type, options) {
                    console.log(`\nadd_past: symbol=${symbol} layer=${layer} type=${type}`);
                    console.log(`options:`);
                    console.dir(options);
                    let past = graphics.actor(`${symbol}${layer}_past`);
                    console.log(`local xpositions = ${options['xpositions']}`);
                    options['first_dynamic_index'] = options['data'].length / 4 - 1;
                    options['symbol'] = symbol;
                    graphics.append(type, -layer * layerDelta, layer, layers[layer], past, options);
                } 
                append(type, depth, layer, layerGroup, ray, options) {
                    console.log(`\n\n ###graphics.append: type = ${type} layer = ${layer} options=`);
                    console.dir(options);
                    switch (type) {
                        case 'ohlc':
                            console.log(`append glyph(s) of type ${type} layerDelta = ${layerDelta}`);
                            ohlc_1.Ohlc.create(-layer * layerDelta, layerGroup, options)
                                .then((tuple) => {
                                let glyph;
                                console.log(`received tuple:`);
                                console.dir(tuple);
                                for (let i = 0; i < tuple['recent'].length; i++) {
                                    glyph = tuple['recent'][i];
                                    ray.push(glyph);
                                    console.log(`glyph = ${glyph}:`);
                                    layerGroup.add(glyph);
                                }
                            });
                            break;
                        case 'candle':
                            console.log(`append glyph(s) of type ${type} layerDelta = ${layerDelta}`);
                            candle_1.Candle.create(-layer * layerDelta, layerGroup, options)
                                .then((tuple) => {
                                let glyph;
                                console.log(`received tuple:`);
                                console.dir(tuple);
                                for (let i = 0; i < tuple['recent'].length; i++) {
                                    glyph = tuple['recent'][i];
                                    ray.push(glyph);
                                    console.log(`glyph = ${glyph}:`);
                                    layerGroup.add(glyph);
                                }
                            });
                            break;
                        default:
                            console.log(`%%% failed to append actor(s) of type ${type}`);
                    }
                } 
            }; 
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

