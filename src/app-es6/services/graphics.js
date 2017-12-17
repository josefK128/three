System.register(["../actors/Grid", "../actors/Line", "../actors/Quad", "../actors/Sprite"], function (exports_1, context_1) {
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
    var Grid_1, Line_1, Quad_1, Sprite_1, graphics, gl, camera, lookAt, controls, scene, stage, stats, renderer, actors, clock, light, et, init_options, count, onWindowResize, Graphics;
    return {
        setters: [
            function (Grid_1_1) {
                Grid_1 = Grid_1_1;
            },
            function (Line_1_1) {
                Line_1 = Line_1_1;
            },
            function (Quad_1_1) {
                Quad_1 = Quad_1_1;
            },
            function (Sprite_1_1) {
                Sprite_1 = Sprite_1_1;
            }
        ],
        execute: function () {
            lookAt = { x: 0.0, y: 0.0, z: 0.0 }, actors = {}, clock = new THREE.Clock(), light = new THREE.PointLight(), et = 0, init_options = {}, count = 0, onWindowResize = () => {
                let w = window.innerWidth, h = window.innerHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            };
            Graphics = class Graphics {
                init(options = {}) {
                    scene = graphics.scene();
                    if (Stats) {
                        stats = new Stats();
                        document.body.appendChild(stats.domElement);
                    }
                    camera = graphics.camera();
                    light.position.set(0, 10, 20);
                    camera.add(light);
                    controls = new THREE.OrbitControls(camera);
                    renderer = graphics.renderer(document.getElementById('space'));
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
                    }
                    return scene;
                }
                camera(fov = 90, aspect = window.innerWidth / window.innerHeight, near = 0.5, far = 1000.0, z = 10) {
                    var w = window.innerWidth, h = window.innerHeight;
                    if (camera === undefined) {
                        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
                        camera.position.z = z;
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
                actor(type, name, options) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var grid, line, quad, sprite, cp = camera.position, layerScale;
                        try {
                            switch (type) {
                                case 'grid':
                                    grid = yield Grid_1.Grid.create(options); 
                                    actors[name] = grid;
                                    scene.add(grid); 
                                    return grid;
                                case 'line':
                                    line = yield Line_1.Line.create(options); 
                                    layerScale = (cp.z - line.position.z) / cp.z;
                                    line.scale.set(layerScale, layerScale, 1.0);
                                    actors[name] = line;
                                    stage.add(line);
                                    return line;
                                case 'quad':
                                    quad = yield Quad_1.Quad.create(options); 
                                    layerScale = (cp.z - quad.position.z) / cp.z;
                                    quad.scale.set(layerScale, layerScale, 1.0);
                                    actors[name] = quad;
                                    stage.add(quad);
                                    return quad;
                                case 'sprite':
                                    sprite = yield Sprite_1.Sprite.create(options); 
                                    layerScale = (cp.z - sprite.position.z) / cp.z;
                                    sprite.scale.set(layerScale, layerScale, 1.0);
                                    actors[name] = sprite;
                                    stage.add(sprite);
                                    return sprite;
                                default:
                                    console.log(`%%% failed to create actor of type ${type}`);
                            }
                        }
                        catch (e) {
                            console.log(`%%% error creating actor of type ${type}: ${e}`);
                        }
                    });
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
                dollyX(dx = 0.0) {
                    let q = actors['quad1'], l = actors['line1'], s = actors['sprite1'], qp = q.position, lp = l.position, sp = s.position, cp = camera.position, qdt, ldt, sdt;
                    console.log(`\n@@@`);
                    console.log(`pre-dolly:quad.position = [${q.position.x},${q.position.y},${q.position.z}]`);
                    camera.translateX(dx);
                    lookAt.x += dx;
                    controls.target.set(lookAt.x, lookAt.y, lookAt.z);
                    console.log(`camera now located at [${cp.x}, ${cp.y}, ${cp.z}]`);
                    console.log(`camera looking at [${lookAt.x}, ${lookAt.y}, ${lookAt.z}]`);
                    qdt = dx / cp.z * qp.z;
                    console.log(`for correct projection of layer ${qp.z}, x-translating quad by ${qdt}`);
                    q.translateX(qdt);
                    ldt = dx / cp.z * lp.z;
                    console.log(`for correct projection of layer ${lp.z}, x-translating line by ${ldt}`);
                    l.translateX(ldt);
                    sdt = dx / cp.z * sp.z;
                    console.log(`for correct projection of layer ${sp.z}, x-translating line by ${sdt}`);
                    s.translateX(sdt);
                    actors['line1'].geometry.setDrawRange(0, 90);
                    console.log(`post:quad.position = [${q.position.x},${q.position.y},${q.position.z}]`);
                    console.log(`@@@\n`);
                }
            }; 
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

