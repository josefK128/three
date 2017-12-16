System.register(["../actors/Grid", "../actors/Line", "../actors/Quad"], function (exports_1, context_1) {
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
    var Grid_1, Line_1, Quad_1, graphics, gl, camera, controls, scene, stage, renderer, actors, clock, light, et, init_options, count, onWindowResize, Graphics;
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
            }
        ],
        execute: function () {
            actors = {}, clock = new THREE.Clock(), light = new THREE.PointLight(), et = 0, init_options = {}, count = 0, onWindowResize = () => {
                let w = window.innerWidth, h = window.innerHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            };
            Graphics = class Graphics {
                init(options = {}) {
                    scene = graphics.scene();
                    camera = graphics.camera();
                    light.position.set(0, 100, 200);
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
                camera(fov = 90, aspect = window.innerWidth / window.innerHeight, near = 0.001, far = 1000.0) {
                    if (camera === undefined) {
                        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 1000);
                        camera.position.z = 38;
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
                actor(type, name) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var grid, line, quad;
                        try {
                            switch (type) {
                                case 'grid':
                                    grid = yield Grid_1.Grid.create(); 
                                    actors[name] = grid;
                                    scene.add(grid); 
                                    return grid;
                                case 'line':
                                    line = yield Line_1.Line.create(); 
                                    actors[name] = line;
                                    stage.add(line);
                                    return line;
                                case 'quad':
                                    quad = yield Quad_1.Quad.create(); 
                                    actors[name] = quad;
                                    stage.add(quad);
                                    return quad;
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
                        if (actors[actor]._scale) {
                            actors[actor]._scale(sx, sy, sz);
                        }
                    }
                }
                pastCamera() {
                    console.log(`camera looking at past(x<0) ONLY...`);
                    actors['line1'].geometry.setDrawRange(0, 90);
                    controls.target.set(-32, 0, 0);
                    camera.translateX(-32);
                }
                presentCamera() {
                    console.log(`camera looking at past(x<0) present(x=0) and future(x>0)...`);
                    controls.target.set(0, 0, 0);
                    camera.translateX(32);
                }
            }; 
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

