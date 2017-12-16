System.register(["../actors/Grid"], function (exports_1, context_1) {
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
    var Grid_1, graphics, camera, renderer, scene, Graphics;
    return {
        setters: [
            function (Grid_1_1) {
                Grid_1 = Grid_1_1;
            }
        ],
        execute: function () {
            camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 1000), renderer = new THREE.WebGLRenderer(document.getElementById("space"), camera), scene = new THREE.Scene();
            Graphics = class Graphics {
                camera(fov = 90, aspect = window.innerWidth / window.innerHeight, near = 0.001, far = 1000.0) {
                    return camera;
                }
                renderer(width = window.innerWidth, height = window.innerHeight) {
                    renderer.setSize(width, height);
                    return renderer;
                }
                scene() {
                    return scene;
                }
                grid() {
                    return __awaiter(this, void 0, void 0, function* () {
                        var grid;
                        console.log(`Grid =`);
                        console.dir(Grid_1.Grid);
                        try {
                            grid = yield Grid_1.Grid.create();
                            console.log(`grid =`);
                            console.dir(grid);
                            console.log(`adding grid to scene = ${scene}`);
                            scene.add(grid);
                            return grid;
                        }
                        catch (e) {
                            console.log(`failed to create grid: ${e}`);
                        }
                    });
                }
            }; 
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

