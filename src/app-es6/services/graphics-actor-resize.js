// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';
System.register(["../actors/Grid", "../actors/Line"], function (exports_1, context_1) {
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
    var Grid_1, Line_1, graphics, camera, controls, scene, renderer, actors, clock, light, et, init_options, onWindowResize, Graphics;
    return {
        setters: [
            function (Grid_1_1) {
                Grid_1 = Grid_1_1;
            },
            function (Line_1_1) {
                Line_1 = Line_1_1;
            }
        ],
        execute: function () {// graphics.ts - Three.js graphics service - singleton
            // usage is by dependency injection or possibly by import:
            // import {graphics} from './services/graphics';
            // closure vars
            actors = {}, clock = new THREE.Clock(), light = new THREE.PointLight(), et = 0, init_options = {}, onWindowResize = () => {
                let w = window.innerWidth, h = window.innerHeight;
                console.log(`onWindowResize w=${w} h=${h}`);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            };
            Graphics = class Graphics {
                // init scene, camera, renderer  etc.
                init(options = {}) {
                    // scene
                    scene = graphics.scene();
                    // camera and light(s)
                    camera = graphics.camera();
                    light.position.set(0, 100, 200);
                    camera.add(light);
                    controls = new THREE.OrbitControls(camera);
                    // WebGLRenderer
                    renderer = graphics.renderer(document.getElementById('space'));
                    // resize renderer and adjust camera aspect ratio
                    window.addEventListener('resize', onWindowResize, false);
                }
                // render-loop - must run init first !!
                animate() {
                    et = clock.getElapsedTime();
                    requestAnimationFrame(graphics.animate);
                    //camera.position.x = 100 * Math.cos( time );
                    //camera.position.z = 50 + 10 * Math.sin( time );
                    controls.update();
                    renderer.render(scene, camera);
                }
                // meta-container for all graphics
                scene() {
                    if (scene === undefined) {
                        scene = new THREE.Scene();
                    }
                    return scene;
                }
                //�default camera
                camera(fov = 90, aspect = window.innerWidth / window.innerHeight, near = 0.001, far = 1000.0) {
                    if (camera === undefined) {
                        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 1000);
                        camera.position.z = 38;
                    }
                    return camera;
                }
                // default renderer 
                renderer(canvas, width = window.innerWidth, height = window.innerHeight) {
                    if (renderer === undefined) {
                        renderer = new THREE.WebGLRenderer({ canvas: canvas });
                        renderer.setPixelRatio(window.devicePixelRatio);
                        renderer.setSize(window.innerWidth, window.innerHeight);
                    }
                    renderer.setSize(width, height);
                    return renderer;
                }
                // create actor - give reference name
                actor(type, name) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var grid, line;
                        console.log(`%%% request to create actor ${name} of type ${type}`);
                        try {
                            switch (type) {
                                case 'grid':
                                    grid = yield Grid_1.Grid.create(); // Grid.create() returns Promise
                                    console.log(`%%% grid =`);
                                    console.dir(grid);
                                    console.log(`%%% typeof grid = ${typeof grid}`);
                                    console.log(`%%% adding grid to actors =${actors} and scene = ${scene}`);
                                    actors[name] = grid;
                                    scene.add(grid);
                                    return grid;
                                case 'line':
                                    console.log(`%%% case 'line'`);
                                    line = yield Line_1.Line.create(); // Line.create() returns Promise
                                    console.log(`%%% line =`);
                                    console.dir(line);
                                    console.log(`%%% typeof line = ${typeof line}`);
                                    console.log(`%%% adding line to actors =${actors} and scene = ${scene}`);
                                    actors[name] = line;
                                    scene.add(line);
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
                scaleActor(actor, sx, sy, sz) {
                    if (actors[actor]) {
                        console.log(`%%% scaling actor = ${actor} sx=${sx} sy=${sy} sz=${sz}`);
                        actors[actor].scale.set(sx, sy, sz);
                        actors[actor]._scale(sx, sy, sz);
                    }
                }
                pastCamera() {
                    console.log(`camera looking at past(x<0) ONLY...`);
                    actors['line1'].geometry.setDrawRange(0, 90);
                    controls.target.set(-40, 0, 0);
                    camera.translateX(-40);
                }
                // not used!
                presentCamera() {
                    console.log(`camera looking at past(x<0) present(x=0) and future(x>0)...`);
                    controls.target.set(0, 0, 0);
                    camera.translateX(40);
                }
            }; //Graphics
            // enforce singleton export
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dyYXBoaWNzLWFjdG9yLXJlc2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzREFBc0Q7QUFDdEQsMERBQTBEO0FBQzFELGdEQUFnRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFGaEQsc0RBQXNEO1lBQ3RELDBEQUEwRDtZQUMxRCxnREFBZ0Q7WUFPaEQsZUFBZTtZQU1YLE1BQU0sR0FBVSxFQUFFLEVBQ2xCLEtBQUssR0FBZSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFDckMsS0FBSyxHQUFvQixJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFDL0MsRUFBRSxHQUFVLENBQUMsRUFDYixZQUFZLEdBQVUsRUFBRSxFQUN4QixjQUFjLEdBQVksR0FBRyxFQUFFO2dCQUM3QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUNyQixDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztnQkFFM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBQ2hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQztZQUdOLFdBQUE7Z0JBRUUscUNBQXFDO2dCQUNyQyxJQUFJLENBQUMsVUFBaUIsRUFBRTtvQkFFdEIsUUFBUTtvQkFDUixLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUV6QixzQkFBc0I7b0JBQ3RCLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzNCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sQ0FBQyxH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VTtZQUlYLDJCQUEyQjtZQUMzQixFQUFFLENBQUEsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUEsQ0FBQztnQkFDekIsc0JBQUEsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLEVBQUM7WUFDNUIsQ0FBQztRQUdELENBQUMiLCJmaWxlIjoic2VydmljZXMvZ3JhcGhpY3MtYWN0b3ItcmVzaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZ3JhcGhpY3MudHMgLSBUaHJlZS5qcyBncmFwaGljcyBzZXJ2aWNlIC0gc2luZ2xldG9uXG4vLyB1c2FnZSBpcyBieSBkZXBlbmRlbmN5IGluamVjdGlvbiBvciBwb3NzaWJseSBieSBpbXBvcnQ6XG4vLyBpbXBvcnQge2dyYXBoaWNzfSBmcm9tICcuL3NlcnZpY2VzL2dyYXBoaWNzJztcblxuaW1wb3J0IHtHcmlkfSBmcm9tICcuLi9hY3RvcnMvR3JpZCc7XG5pbXBvcnQge0xpbmV9IGZyb20gJy4uL2FjdG9ycy9MaW5lJztcblxuXG5cbi8vIGNsb3N1cmUgdmFyc1xudmFyIGdyYXBoaWNzOkdyYXBoaWNzLFxuICAgIGNhbWVyYTpUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSxcbiAgICBjb250cm9sczpUSFJFRS5PcmJpdENvbnRyb2xzLFxuICAgIHNjZW5lOlRIUkVFLlNjZW5lLFxuICAgIHJlbmRlcmVyOlRIUkVFLldlYkdMUmVuZGVyZXIsXG4gICAgYWN0b3JzOm9iamVjdCA9IHt9LFxuICAgIGNsb2NrOlRIUkVFLkNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCksXG4gICAgbGlnaHQ6VEhSRUUuUG9pbnRMaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KCksXG4gICAgZXQ6bnVtYmVyID0gMCwgIC8vIGVsYXBzZWRUaW1lIGZyb20gY2xvY2sgIFxuICAgIGluaXRfb3B0aW9uczpvYmplY3QgPSB7fSxcbiAgICBvbldpbmRvd1Jlc2l6ZTpmdW5jdGlvbiA9ICgpID0+IHtcbiAgICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICBcbiAgICAgIGNvbnNvbGUubG9nKGBvbldpbmRvd1Jlc2l6ZSB3PSR7d30gaD0ke2h9YCk7XG4gICAgICBjYW1lcmEuYXNwZWN0ID0gdy9oO1xuICAgICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICAgIHJlbmRlcmVyLnNldFNpemUodyxoKTtcbiAgICB9O1xuXG5cbmNsYXNzIEdyYXBoaWNzIHtcblxuICAvLyBpbml0IHNjZW5lLCBjYW1lcmEsIHJlbmRlcmVyICBldGMuXG4gIGluaXQob3B0aW9uczpvYmplY3QgPSB7fSk6dm9pZCB7XG5cbiAgICAvLyBzY2VuZVxuICAgIHNjZW5lID0gZ3JhcGhpY3Muc2NlbmUoKTtcblxuICAgIC8vIGNhbWVyYSBhbmQgbGlnaHQocylcbiAgICBjYW1lcmEgPSBncmFwaGljcy5jYW1lcmEoKTtcbiAgICBsaWdodC5wb3NpdGlvbi5zZXQoMCwgMTAwLCAyMDApO1xuICAgIGNhbWVyYS5hZGQobGlnaHQpO1xuICAgIGNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoY2FtZXJhKTtcblxuICAgIC8vIFdlYkdMUmVuZGVyZXJcbiAgICByZW5kZXJlciA9IGdyYXBoaWNzLnJlbmRlcmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGFjZScpKTtcblxuICAgIC8vIHJlc2l6ZSByZW5kZXJlciBhbmQgYWRqdXN0IGNhbWVyYSBhc3BlY3QgcmF0aW9cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIG9uV2luZG93UmVzaXplLCBmYWxzZSApO1xuICB9XG5cblxuICAvLyByZW5kZXItbG9vcCAtIG11c3QgcnVuIGluaXQgZmlyc3QgISFcbiAgYW5pbWF0ZSgpOnZvaWQge1xuXG4gICAgZXQgPSBjbG9jay5nZXRFbGFwc2VkVGltZSgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZ3JhcGhpY3MuYW5pbWF0ZSApO1xuICAgIC8vY2FtZXJhLnBvc2l0aW9uLnggPSAxMDAgKiBNYXRoLmNvcyggdGltZSApO1xuICAgIC8vY2FtZXJhLnBvc2l0aW9uLnogPSA1MCArIDEwICogTWF0aC5zaW4oIHRpbWUgKTtcbiAgICBjb250cm9scy51cGRhdGUoKTtcbiAgICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBjYW1lcmEgKTtcbiAgfVxuXG5cblxuICAgIFxuICAvLyBtZXRhLWNvbnRhaW5lciBmb3IgYWxsIGdyYXBoaWNzXG4gIHNjZW5lKCk6VEhSRUUuU2NlbmUge1xuXG4gICAgaWYoc2NlbmUgPT09IHVuZGVmaW5lZCl7XG4gICAgICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc2NlbmU7XG4gIH1cblxuXG4gIC8v77+9ZGVmYXVsdCBjYW1lcmFcbiAgY2FtZXJhKGZvdjpudW1iZXIgPSA5MCwgYXNwZWN0Om51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoL3dpbmRvdy5pbm5lckhlaWdodCwgbmVhcjpudW1iZXIgPSAwLjAwMSwgZmFyOm51bWJlciA9IDEwMDAuMCk6VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEge1xuXG4gICAgaWYoY2FtZXJhID09PSB1bmRlZmluZWQpe1xuICAgICAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCA5MCwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMDAxLCAxMDAwICk7XG4gICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDM4O1xuICAgIH1cbiAgICByZXR1cm4gY2FtZXJhO1xuICB9XG5cblxuICAvLyBkZWZhdWx0IHJlbmRlcmVyIFxuICByZW5kZXJlcihjYW52YXM6SFRNTEVsZW1lbnQsIHdpZHRoOm51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6bnVtYmVyID0gd2luZG93LmlubmVySGVpZ2h0KTogVEhSRUUuV2ViR0xSZW5kZXJlciB7XG5cbiAgICBpZihyZW5kZXJlciA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe2NhbnZhczpjYW52YXN9KTtcbiAgICAgIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICk7XG4gICAgICByZW5kZXJlci5zZXRTaXplKCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG4gICAgfVxuICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCApO1xuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG5cbiAgLy8gY3JlYXRlIGFjdG9yIC0gZ2l2ZSByZWZlcmVuY2UgbmFtZVxuICBhc3luYyBhY3Rvcih0eXBlOnN0cmluZywgbmFtZTpzdHJpbmcpOlByb21pc2U8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICB2YXIgZ3JpZDpUSFJFRS5HcmlkSGVscGVyLFxuICAgICAgICBsaW5lOlRIUkVFLmxpbmU7XG5cbiAgICBjb25zb2xlLmxvZyhgJSUlIHJlcXVlc3QgdG8gY3JlYXRlIGFjdG9yICR7bmFtZX0gb2YgdHlwZSAke3R5cGV9YCk7XG4gICAgdHJ5e1xuICAgICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICBjYXNlICdncmlkJzpcbiAgICAgICAgICBncmlkID0gYXdhaXQgR3JpZC5jcmVhdGUoKTsgIC8vIEdyaWQuY3JlYXRlKCkgcmV0dXJucyBQcm9taXNlXG4gICAgICAgICAgY29uc29sZS5sb2coYCUlJSBncmlkID1gKTtcbiAgICAgICAgICBjb25zb2xlLmRpcihncmlkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJSUlIHR5cGVvZiBncmlkID0gJHt0eXBlb2YgZ3JpZH1gKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJSUlIGFkZGluZyBncmlkIHRvIGFjdG9ycyA9JHthY3RvcnN9IGFuZCBzY2VuZSA9ICR7c2NlbmV9YCk7XG4gICAgICAgICAgYWN0b3JzW25hbWVdID0gZ3JpZDtcbiAgICAgICAgICBzY2VuZS5hZGQoZ3JpZCk7XG4gICAgICAgICAgcmV0dXJuIGdyaWQ7XG5cbiAgICAgICAgY2FzZSAnbGluZSc6XG4gICAgICAgICAgY29uc29sZS5sb2coYCUlJSBjYXNlICdsaW5lJ2ApO1xuICAgICAgICAgIGxpbmUgPSBhd2FpdCBMaW5lLmNyZWF0ZSgpOyAgLy8gTGluZS5jcmVhdGUoKSByZXR1cm5zIFByb21pc2VcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJSUlIGxpbmUgPWApO1xuICAgICAgICAgIGNvbnNvbGUuZGlyKGxpbmUpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAlJSUgdHlwZW9mIGxpbmUgPSAke3R5cGVvZiBsaW5lfWApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAlJSUgYWRkaW5nIGxpbmUgdG8gYWN0b3JzID0ke2FjdG9yc30gYW5kIHNjZW5lID0gJHtzY2VuZX1gKTtcbiAgICAgICAgICBhY3RvcnNbbmFtZV0gPSBsaW5lO1xuICAgICAgICAgIHNjZW5lLmFkZChsaW5lKTtcbiAgICAgICAgICByZXR1cm4gbGluZTtcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUubG9nKGAlJSUgZmFpbGVkIHRvIGNyZWF0ZSBhY3RvciBvZiB0eXBlICR7dHlwZX1gKTtcbiAgICAgIH1cbiAgICB9Y2F0Y2goZSl7XG4gICAgIGNvbnNvbGUubG9nKGAlJSUgZXJyb3IgY3JlYXRpbmcgYWN0b3Igb2YgdHlwZSAke3R5cGV9OiAke2V9YCk7XG4gICAgfVxuICB9XG5cblxuICBzY2FsZUFjdG9yKGFjdG9yOnN0cmluZywgc3g6bnVtYmVyLCBzeTpudW1iZXIsIHN6Om51bWJlcik6dm9pZCB7XG4gICAgaWYoYWN0b3JzW2FjdG9yXSl7XG4gICAgY29uc29sZS5sb2coYCUlJSBzY2FsaW5nIGFjdG9yID0gJHthY3Rvcn0gc3g9JHtzeH0gc3k9JHtzeX0gc3o9JHtzen1gKTtcbiAgICAgIGFjdG9yc1thY3Rvcl0uc2NhbGUuc2V0KHN4LCBzeSwgc3opO1xuICAgICAgYWN0b3JzW2FjdG9yXS5fc2NhbGUoc3gsIHN5LCBzeik7XG4gICAgfVxuICB9XG5cblxuICBwYXN0Q2FtZXJhKCk6dm9pZCB7XG4gICAgY29uc29sZS5sb2coYGNhbWVyYSBsb29raW5nIGF0IHBhc3QoeDwwKSBPTkxZLi4uYCk7XG4gICAgYWN0b3JzWydsaW5lMSddLmdlb21ldHJ5LnNldERyYXdSYW5nZSgwLCA5MCk7XG4gICAgY29udHJvbHMudGFyZ2V0LnNldCggLTQwLCAwLCAwICk7XG4gICAgY2FtZXJhLnRyYW5zbGF0ZVgoLTQwKTtcbiAgfVxuXG4gIC8vIG5vdCB1c2VkIVxuICBwcmVzZW50Q2FtZXJhKCk6dm9pZCB7XG4gICAgY29uc29sZS5sb2coYGNhbWVyYSBsb29raW5nIGF0IHBhc3QoeDwwKSBwcmVzZW50KHg9MCkgYW5kIGZ1dHVyZSh4PjApLi4uYCk7XG4gICAgY29udHJvbHMudGFyZ2V0LnNldCggMCwgMCwgMCApO1xuICAgIGNhbWVyYS50cmFuc2xhdGVYKDQwKTtcbiAgfVxuXG59Ly9HcmFwaGljc1xuXG5cblxuLy8gZW5mb3JjZSBzaW5nbGV0b24gZXhwb3J0XG5pZihncmFwaGljcyA9PT0gdW5kZWZpbmVkKXtcbiAgZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3MoKTtcbn1cblxuZXhwb3J0IHtncmFwaGljc307XG4iXX0=
