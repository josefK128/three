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
    var Grid_1, Line_1, graphics, camera, controls, scene, renderer, actors, clock, light, et, init_options, Graphics;
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
            actors = {}, clock = new THREE.Clock(), light = new THREE.PointLight(), et = 0, init_options = {};
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dyYXBoaWNzLWFjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsZ0RBQWdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUZoRCxzREFBc0Q7WUFDdEQsMERBQTBEO1lBQzFELGdEQUFnRDtZQU9oRCxlQUFlO1lBTVgsTUFBTSxHQUFVLEVBQUUsRUFDbEIsS0FBSyxHQUFlLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxFQUNyQyxLQUFLLEdBQW9CLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUMvQyxFQUFFLEdBQVUsQ0FBQyxFQUNiLFlBQVksR0FBVSxFQUFFLENBQUM7WUFHN0IsV0FBQTtnQkFFRSxxQ0FBcUM7Z0JBQ3JDLElBQUksQ0FBQyxVQUFpQixFQUFFO29CQUV0QixRQUFRO29CQUNSLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXpCLHNCQUFzQjtvQkFDdEIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDM0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEIsUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFM0MsZ0JBQWdCO29CQUNoQixRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLENBQUM7Z0JBR0QsdUNBQXVDO2dCQUN2QyxPQUFPO29CQUVMLEVBQUUsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQzVCLHFCQUFxQixDQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUUsQ0FBQztvQkFDMUMsNkNBQTZDO29CQUM3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Q0FBQyxDQUFDO29CQUNuQyxDQUFDO2dCQUNILENBQUM7Z0JBR0QsVUFBVTtvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7b0JBQ25ELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDN0MsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO29CQUNqQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQsWUFBWTtnQkFDWixhQUFhO29CQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkRBQTZELENBQUMsQ0FBQztvQkFDM0UsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztvQkFDL0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEIsQ0FBQzthQUVGLENBQUEsQ0FBQSxVQUFVO1lBSVgsMkJBQTJCO1lBQzNCLEVBQUUsQ0FBQSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQSxDQUFDO2dCQUN6QixzQkFBQSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsRUFBQztZQUM1QixDQUFDO1FBR0QsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9ncmFwaGljcy1hY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGdyYXBoaWNzLnRzIC0gVGhyZWUuanMgZ3JhcGhpY3Mgc2VydmljZSAtIHNpbmdsZXRvblxuLy8gdXNhZ2UgaXMgYnkgZGVwZW5kZW5jeSBpbmplY3Rpb24gb3IgcG9zc2libHkgYnkgaW1wb3J0OlxuLy8gaW1wb3J0IHtncmFwaGljc30gZnJvbSAnLi9zZXJ2aWNlcy9ncmFwaGljcyc7XG5cbmltcG9ydCB7R3JpZH0gZnJvbSAnLi4vYWN0b3JzL0dyaWQnO1xuaW1wb3J0IHtMaW5lfSBmcm9tICcuLi9hY3RvcnMvTGluZSc7XG5cblxuXG4vLyBjbG9zdXJlIHZhcnNcbnZhciBncmFwaGljczpHcmFwaGljcyxcbiAgICBjYW1lcmE6VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEsXG4gICAgY29udHJvbHM6VEhSRUUuT3JiaXRDb250cm9scyxcbiAgICBzY2VuZTpUSFJFRS5TY2VuZSxcbiAgICByZW5kZXJlcjpUSFJFRS5XZWJHTFJlbmRlcmVyLFxuICAgIGFjdG9yczpvYmplY3QgPSB7fSxcbiAgICBjbG9jazpUSFJFRS5DbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpLFxuICAgIGxpZ2h0OlRIUkVFLlBvaW50TGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgpLFxuICAgIGV0Om51bWJlciA9IDAsICAvLyBlbGFwc2VkVGltZSBmcm9tIGNsb2NrICBcbiAgICBpbml0X29wdGlvbnM6b2JqZWN0ID0ge307XG5cblxuY2xhc3MgR3JhcGhpY3Mge1xuXG4gIC8vIGluaXQgc2NlbmUsIGNhbWVyYSwgcmVuZGVyZXIgIGV0Yy5cbiAgaW5pdChvcHRpb25zOm9iamVjdCA9IHt9KTp2b2lkIHtcblxuICAgIC8vIHNjZW5lXG4gICAgc2NlbmUgPSBncmFwaGljcy5zY2VuZSgpO1xuXG4gICAgLy8gY2FtZXJhIGFuZCBsaWdodChzKVxuICAgIGNhbWVyYSA9IGdyYXBoaWNzLmNhbWVyYSgpO1xuICAgIGxpZ2h0LnBvc2l0aW9uLnNldCgwLCAxMDAsIDIwMCk7XG4gICAgY2FtZXJhLmFkZChsaWdodCk7XG4gICAgY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhjYW1lcmEpO1xuXG4gICAgLy8gV2ViR0xSZW5kZXJlclxuICAgIHJlbmRlcmVyID0gZ3JhcGhpY3MucmVuZGVyZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwYWNlJykpO1xuICB9XG5cblxuICAvLyByZW5kZXItbG9vcCAtIG11c3QgcnVuIGluaXQgZmlyc3QgISFcbiAgYW5pbWF0ZSgpOnZvaWQge1xuXG4gICAgZXQgPSBjbG9jay5nZXRFbGFwc2VkVGltZSgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZ3JhcGhpY3MuYW5pbWF0ZSApO1xuICAgIC8vY2FtZXJhLnBvc2l0aW9uLnggPSAxMDAgKiBNYXRoLmNvcyggdGltZSApO1xuICAgIC8vY2FtZXJhLnBvc2l0aW9uLnogPSA1MCArIDEwICogTWF0aC5zaW4oIHRpbWUgKTtcbiAgICBjb250cm9scy51cGRhdGUoKTtcbiAgICByZW5kZXJlci5yZW5kZXIoIHNjZW5lLCBjYW1lcmEgKTtcbiAgfVxuXG5cblxuICAgIFxuICAvLyBtZXRhLWNvbnRhaW5lciBmb3IgYWxsIGdyYXBoaWNzXG4gIHNjZW5lKCk6VEhSRUUuU2NlbmUge1xuXG4gICAgaWYoc2NlbmUgPT09IHVuZGVmaW5lZCl7XG4gICAgICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc2NlbmU7XG4gIH1cblxuXG4gIC8v77+9ZGVmYXVsdCBjYW1lcmFcbiAgY2FtZXJhKGZvdjpudW1iZXIgPSA5MCwgYXNwZWN0Om51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoL3dpbmRvdy5pbm5lckhlaWdodCwgbmVhcjpudW1iZXIgPSAwLjAwMSwgZmFyOm51bWJlciA9IDEwMDAuMCk6VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEge1xuXG4gICAgaWYoY2FtZXJhID09PSB1bmRlZmluZWQpe1xuICAgICAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCA5MCwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMDAxLCAxMDAwICk7XG4gICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDM4O1xuICAgIH1cbiAgICByZXR1cm4gY2FtZXJhO1xuICB9XG5cblxuICAvLyBkZWZhdWx0IHJlbmRlcmVyIFxuICByZW5kZXJlcihjYW52YXM6SFRNTEVsZW1lbnQsIHdpZHRoOm51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6bnVtYmVyID0gd2luZG93LmlubmVySGVpZ2h0KTogVEhSRUUuV2ViR0xSZW5kZXJlciB7XG5cbiAgICBpZihyZW5kZXJlciA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe2NhbnZhczpjYW52YXN9KTtcbiAgICAgIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICk7XG4gICAgICByZW5kZXJlci5zZXRTaXplKCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG4gICAgfVxuICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCApO1xuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG5cbiAgLy8gY3JlYXRlIGFjdG9yIC0gZ2l2ZSByZWZlcmVuY2UgbmFtZVxuICBhc3luYyBhY3Rvcih0eXBlOnN0cmluZywgbmFtZTpzdHJpbmcpOlByb21pc2U8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICB2YXIgZ3JpZDpUSFJFRS5HcmlkSGVscGVyLFxuICAgICAgICBsaW5lOlRIUkVFLmxpbmU7XG5cbiAgICBjb25zb2xlLmxvZyhgJSUlIHJlcXVlc3QgdG8gY3JlYXRlIGFjdG9yICR7bmFtZX0gb2YgdHlwZSAke3R5cGV9YCk7XG4gICAgdHJ5e1xuICAgICAgc3dpdGNoKHR5cGUpe1xuICAgICAgICBjYXNlICdncmlkJzpcbiAgICAgICAgICBncmlkID0gYXdhaXQgR3JpZC5jcmVhdGUoKTsgIC8vIEdyaWQuY3JlYXRlKCkgcmV0dXJucyBQcm9taXNlXG4gICAgICAgICAgY29uc29sZS5sb2coYCUlJSBncmlkID1gKTtcbiAgICAgICAgICBjb25zb2xlLmRpcihncmlkKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJSUlIHR5cGVvZiBncmlkID0gJHt0eXBlb2YgZ3JpZH1gKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJSUlIGFkZGluZyBncmlkIHRvIGFjdG9ycyA9JHthY3RvcnN9IGFuZCBzY2VuZSA9ICR7c2NlbmV9YCk7XG4gICAgICAgICAgYWN0b3JzW25hbWVdID0gZ3JpZDtcbiAgICAgICAgICBzY2VuZS5hZGQoZ3JpZCk7XG4gICAgICAgICAgcmV0dXJuIGdyaWQ7XG5cbiAgICAgICAgY2FzZSAnbGluZSc6XG4gICAgICAgICAgY29uc29sZS5sb2coYCUlJSBjYXNlICdsaW5lJ2ApO1xuICAgICAgICAgIGxpbmUgPSBhd2FpdCBMaW5lLmNyZWF0ZSgpOyAgLy8gTGluZS5jcmVhdGUoKSByZXR1cm5zIFByb21pc2VcbiAgICAgICAgICBjb25zb2xlLmxvZyhgJSUlIGxpbmUgPWApO1xuICAgICAgICAgIGNvbnNvbGUuZGlyKGxpbmUpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAlJSUgdHlwZW9mIGxpbmUgPSAke3R5cGVvZiBsaW5lfWApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAlJSUgYWRkaW5nIGxpbmUgdG8gYWN0b3JzID0ke2FjdG9yc30gYW5kIHNjZW5lID0gJHtzY2VuZX1gKTtcbiAgICAgICAgICBhY3RvcnNbbmFtZV0gPSBsaW5lO1xuICAgICAgICAgIHNjZW5lLmFkZChsaW5lKTtcbiAgICAgICAgICByZXR1cm4gbGluZTtcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUubG9nKGAlJSUgZmFpbGVkIHRvIGNyZWF0ZSBhY3RvciBvZiB0eXBlICR7dHlwZX1gKTtcbiAgICAgIH1cbiAgICB9Y2F0Y2goZSl7XG4gICAgIGNvbnNvbGUubG9nKGAlJSUgZXJyb3IgY3JlYXRpbmcgYWN0b3Igb2YgdHlwZSAke3R5cGV9OiAke2V9YCk7XG4gICAgfVxuICB9XG5cblxuICBzY2FsZUFjdG9yKGFjdG9yOnN0cmluZywgc3g6bnVtYmVyLCBzeTpudW1iZXIsIHN6Om51bWJlcik6dm9pZCB7XG4gICAgaWYoYWN0b3JzW2FjdG9yXSl7XG4gICAgY29uc29sZS5sb2coYCUlJSBzY2FsaW5nIGFjdG9yID0gJHthY3Rvcn0gc3g9JHtzeH0gc3k9JHtzeX0gc3o9JHtzen1gKTtcbiAgICAgIGFjdG9yc1thY3Rvcl0uc2NhbGUuc2V0KHN4LCBzeSwgc3opO1xuICAgICAgYWN0b3JzW2FjdG9yXS5fc2NhbGUoc3gsIHN5LCBzeik7XG4gICAgfVxuICB9XG5cblxuICBwYXN0Q2FtZXJhKCk6dm9pZCB7XG4gICAgY29uc29sZS5sb2coYGNhbWVyYSBsb29raW5nIGF0IHBhc3QoeDwwKSBPTkxZLi4uYCk7XG4gICAgYWN0b3JzWydsaW5lMSddLmdlb21ldHJ5LnNldERyYXdSYW5nZSgwLCA5MCk7XG4gICAgY29udHJvbHMudGFyZ2V0LnNldCggLTQwLCAwLCAwICk7XG4gICAgY2FtZXJhLnRyYW5zbGF0ZVgoLTQwKTtcbiAgfVxuXG4gIC8vIG5vdCB1c2VkIVxuICBwcmVzZW50Q2FtZXJhKCk6dm9pZCB7XG4gICAgY29uc29sZS5sb2coYGNhbWVyYSBsb29raW5nIGF0IHBhc3QoeDwwKSBwcmVzZW50KHg9MCkgYW5kIGZ1dHVyZSh4PjApLi4uYCk7XG4gICAgY29udHJvbHMudGFyZ2V0LnNldCggMCwgMCwgMCApO1xuICAgIGNhbWVyYS50cmFuc2xhdGVYKDQwKTtcbiAgfVxuXG59Ly9HcmFwaGljc1xuXG5cblxuLy8gZW5mb3JjZSBzaW5nbGV0b24gZXhwb3J0XG5pZihncmFwaGljcyA9PT0gdW5kZWZpbmVkKXtcbiAgZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3MoKTtcbn1cblxuZXhwb3J0IHtncmFwaGljc307XG4iXX0=
