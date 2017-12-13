// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';
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
    var Grid_1, graphics, camera, scene, renderer, actors, Graphics;
    return {
        setters: [
            function (Grid_1_1) {
                Grid_1 = Grid_1_1;
            }
        ],
        execute: function () {// graphics.ts - Three.js graphics service - singleton
            // usage is by dependency injection or possibly by import:
            // import {graphics} from './services/graphics';
            // closure vars
            actors = {};
            Graphics = class Graphics {
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
                // meta-container for all graphics
                scene() {
                    if (scene === undefined) {
                        scene = new THREE.Scene();
                    }
                    return scene;
                }
                // create actor - give reference name
                grid(type, name) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var grid;
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
                        console.log(`%%% scaling actor = ${actor}`);
                        actors[actor]._scale(sx, sy, sz);
                    }
                }
                pastCamera() {
                    console.log(`camera looking at past(x<0) ONLY...`);
                    camera.translateX(-60);
                }
                presentCamera() {
                    console.log(`camera looking at past(x<0) present(x=0) and future(x>0)...`);
                    camera.translateX(60);
                }
            }; //Graphics
            // enforce singleton export
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dyYXBoaWNzLWFjdG9yLXRvcGxldmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsZ0RBQWdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUZoRCxzREFBc0Q7WUFDdEQsMERBQTBEO1lBQzFELGdEQUFnRDtZQU1oRCxlQUFlO1lBS1gsTUFBTSxHQUFVLEVBQUUsQ0FBQztZQUd2QixXQUFBO2dCQUVFLGlCQUFpQjtnQkFDakIsTUFBTSxDQUFDLE1BQWEsRUFBRSxFQUFFLFNBQWdCLE1BQU0sQ0FBQyxVQUFVLEdBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxPQUFjLEtBQUssRUFBRSxNQUFhLE1BQU07b0JBRXBILEVBQUUsQ0FBQSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQSxDQUFDO3dCQUN2QixNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFFLENBQUM7d0JBQ2hHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDekIsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELG9CQUFvQjtnQkFDcEIsUUFBUSxDQUFDLE1BQXdCLEVBQUUsUUFBZSxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQWdCLE1BQU0sQ0FBQyxXQUFXO29CQUVyRyxFQUFFLENBQUEsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUEsQ0FBQzt3QkFDekIsUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO3dCQUNwRCxRQUFRLENBQUMsYUFBYSxDQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDO3dCQUNsRCxRQUFRLENBQUMs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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZ3JhcGhpY3MudHMgLSBUaHJlZS5qcyBncmFwaGljcyBzZXJ2aWNlIC0gc2luZ2xldG9uXG4vLyB1c2FnZSBpcyBieSBkZXBlbmRlbmN5IGluamVjdGlvbiBvciBwb3NzaWJseSBieSBpbXBvcnQ6XG4vLyBpbXBvcnQge2dyYXBoaWNzfSBmcm9tICcuL3NlcnZpY2VzL2dyYXBoaWNzJztcblxuaW1wb3J0IHtHcmlkfSBmcm9tICcuLi9hY3RvcnMvR3JpZCc7XG5cblxuXG4vLyBjbG9zdXJlIHZhcnNcbnZhciBncmFwaGljczpHcmFwaGljcyxcbiAgICBjYW1lcmE6VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEsXG4gICAgc2NlbmU6VEhSRUUuU2NlbmUsXG4gICAgcmVuZGVyZXI6VEhSRUUuV2ViR0xSZW5kZXJlcixcbiAgICBhY3RvcnM6b2JqZWN0ID0ge307XG5cblxuY2xhc3MgR3JhcGhpY3Mge1xuXG4gIC8v77+9ZGVmYXVsdCBjYW1lcmFcbiAgY2FtZXJhKGZvdjpudW1iZXIgPSA5MCwgYXNwZWN0Om51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoL3dpbmRvdy5pbm5lckhlaWdodCwgbmVhcjpudW1iZXIgPSAwLjAwMSwgZmFyOm51bWJlciA9IDEwMDAuMCk6VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEge1xuXG4gICAgaWYoY2FtZXJhID09PSB1bmRlZmluZWQpe1xuICAgICAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCA5MCwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMDAxLCAxMDAwICk7XG4gICAgICBjYW1lcmEucG9zaXRpb24ueiA9IDM4O1xuICAgIH1cbiAgICByZXR1cm4gY2FtZXJhO1xuICB9XG5cbiAgLy8gZGVmYXVsdCByZW5kZXJlciBcbiAgcmVuZGVyZXIoY2FudmFzOkhUTUxDYW52YXNFbGVtZW50LCB3aWR0aDpudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0Om51bWJlciA9IHdpbmRvdy5pbm5lckhlaWdodCk6IFRIUkVFLldlYkdMUmVuZGVyZXIge1xuXG4gICAgaWYocmVuZGVyZXIgPT09IHVuZGVmaW5lZCl7XG4gICAgICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtjYW52YXM6Y2FudmFzfSk7XG4gICAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyApO1xuICAgICAgcmVuZGVyZXIuc2V0U2l6ZSggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuICAgIH1cbiAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQgKTtcbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cblxuICAgIFxuICAvLyBtZXRhLWNvbnRhaW5lciBmb3IgYWxsIGdyYXBoaWNzXG4gIHNjZW5lKCk6VEhSRUUuU2NlbmUge1xuXG4gICAgaWYoc2NlbmUgPT09IHVuZGVmaW5lZCl7XG4gICAgICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc2NlbmU7XG4gIH1cblxuXG4gIC8vIGNyZWF0ZSBhY3RvciAtIGdpdmUgcmVmZXJlbmNlIG5hbWVcbiAgYXN5bmMgZ3JpZCh0eXBlOnN0cmluZywgbmFtZTpzdHJpbmcpOlByb21pc2U8VEhSRUUuT2JqZWN0M0Q+IHtcbiAgICB2YXIgZ3JpZDpUSFJFRS5HcmlkSGVscGVyO1xuXG4gICAgY29uc29sZS5sb2coYCUlJSByZXF1ZXN0IHRvIGNyZWF0ZSBhY3RvciAke25hbWV9IG9mIHR5cGUgJHt0eXBlfWApO1xuICAgIHRyeXtcbiAgICAgIHN3aXRjaCh0eXBlKXtcbiAgICAgICAgY2FzZSAnZ3JpZCc6XG4gICAgICAgICAgZ3JpZCA9IGF3YWl0IEdyaWQuY3JlYXRlKCk7ICAvLyBHcmlkLmNyZWF0ZSgpIHJldHVybnMgUHJvbWlzZVxuICAgICAgICAgIGNvbnNvbGUubG9nKGAlJSUgZ3JpZCA9YCk7XG4gICAgICAgICAgY29uc29sZS5kaXIoZ3JpZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coYCUlJSB0eXBlb2YgZ3JpZCA9ICR7dHlwZW9mIGdyaWR9YCk7XG4gICAgICAgICAgY29uc29sZS5sb2coYCUlJSBhZGRpbmcgZ3JpZCB0byBhY3RvcnMgPSR7YWN0b3JzfSBhbmQgc2NlbmUgPSAke3NjZW5lfWApO1xuICAgICAgICAgIGFjdG9yc1tuYW1lXSA9IGdyaWQ7XG4gICAgICAgICAgc2NlbmUuYWRkKGdyaWQpO1xuICAgICAgICAgIHJldHVybiBncmlkO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5sb2coYCUlJSBmYWlsZWQgdG8gY3JlYXRlIGFjdG9yIG9mIHR5cGUgJHt0eXBlfWApO1xuICAgICAgfVxuICAgIH1jYXRjaChlKXtcbiAgICAgY29uc29sZS5sb2coYCUlJSBlcnJvciBjcmVhdGluZyBhY3RvciBvZiB0eXBlICR7dHlwZX06ICR7ZX1gKTtcbiAgICB9XG4gIH1cblxuXG4gIHNjYWxlQWN0b3IoYWN0b3I6c3RyaW5nLCBzeDpudW1iZXIsIHN5Om51bWJlciwgc3o6bnVtYmVyKTp2b2lkIHtcbiAgICBpZihhY3RvcnNbYWN0b3JdKXtcbiAgICBjb25zb2xlLmxvZyhgJSUlIHNjYWxpbmcgYWN0b3IgPSAke2FjdG9yfWApO1xuICAgICAgYWN0b3JzW2FjdG9yXS5fc2NhbGUoc3gsIHN5LCBzeik7XG4gICAgfVxuICB9XG5cblxuICBwYXN0Q2FtZXJhKCk6VEhSRUUuVmVjdG9yMyB7XG4gIGNvbnNvbGUubG9nKGBjYW1lcmEgbG9va2luZyBhdCBwYXN0KHg8MCkgT05MWS4uLmApO1xuICAgIGNhbWVyYS50cmFuc2xhdGVYKC02MCk7XG4gIH1cblxuICBwcmVzZW50Q2FtZXJhKCk6VEhSRUUuVmVjdG9yMyB7XG4gICAgY29uc29sZS5sb2coYGNhbWVyYSBsb29raW5nIGF0IHBhc3QoeDwwKSBwcmVzZW50KHg9MCkgYW5kIGZ1dHVyZSh4PjApLi4uYCk7XG4gICAgY2FtZXJhLnRyYW5zbGF0ZVgoNjApO1xuICB9XG5cbn0vL0dyYXBoaWNzXG5cblxuXG4vLyBlbmZvcmNlIHNpbmdsZXRvbiBleHBvcnRcbmlmKGdyYXBoaWNzID09PSB1bmRlZmluZWQpe1xuICBncmFwaGljcyA9IG5ldyBHcmFwaGljcygpO1xufVxuXG5leHBvcnQge2dyYXBoaWNzfTtcbiJdfQ==
