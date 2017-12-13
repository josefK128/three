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
    var Grid_1, graphics, camera, renderer, scene, Graphics;
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
            camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 1000), renderer = new THREE.WebGLRenderer(document.getElementById("space"), camera), scene = new THREE.Scene();
            Graphics = class Graphics {
                //�default camera
                camera(fov = 90, aspect = window.innerWidth / window.innerHeight, near = 0.001, far = 1000.0) {
                    return camera;
                }
                // default renderer 
                renderer(width = window.innerWidth, height = window.innerHeight) {
                    renderer.setSize(width, height);
                    return renderer;
                }
                // meta-container for all graphics
                scene() {
                    // return meta-container - 'scene'
                    return scene;
                }
                // create and return grid
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
            }; //Graphics
            // enforce singleton export
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dyYXBoaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsZ0RBQWdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUZoRCxzREFBc0Q7WUFDdEQsMERBQTBEO1lBQzFELGdEQUFnRDtZQU1oRCxlQUFlO1lBRVgsTUFBTSxHQUEyQixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUUsRUFDdkgsUUFBUSxHQUF1QixJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsRUFDaEcsS0FBSyxHQUFlLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRzFDLFdBQUE7Z0JBRUUsaUJBQWlCO2dCQUNqQixNQUFNLENBQUMsTUFBYSxFQUFFLEVBQUUsU0FBZ0IsTUFBTSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLE9BQWMsS0FBSyxFQUFFLE1BQWEsTUFBTTtvQkFFcEgsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFFRCxvQkFBb0I7Z0JBQ3BCLFFBQVEsQ0FBQyxRQUFlLE1BQU0sQ0FBQyxVQUFVLEVBQUUsU0FBZ0IsTUFBTSxDQUFDLFdBQVc7b0JBRTNFLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBRSxDQUFDO29CQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNsQixDQUFDO2dCQUdELGtDQUFrQztnQkFDbEMsS0FBSztvQkFFSCxrQ0FBa0M7b0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztnQkFHRCx5QkFBeUI7Z0JBQ25CLElBQUk7O3dCQUNSLElBQUksSUFBcUIsQ0FBQzt3QkFFMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFJLENBQUMsQ0FBQzt3QkFDbEIsSUFBRyxDQUFDOzRCQUNGLElBQUksR0FBRyxNQUFNLFdBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs0QkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsS0FBSyxFQUFFLENBQUMsQ0FBQzs0QkFDL0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDZCxDQUFDO3dCQUFBLEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7NEJBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDN0MsQ0FBQztvQkFDSCxDQUFDO2lCQUFBO2FBRUYsQ0FBQSxDQUFBLFVBQVU7WUFJWCwyQkFBMkI7WUFDM0IsRUFBRSxDQUFBLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3pCLHNCQUFBLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxFQUFDO1lBQzVCLENBQUM7UUFHRCxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL2dyYXBoaWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZ3JhcGhpY3MudHMgLSBUaHJlZS5qcyBncmFwaGljcyBzZXJ2aWNlIC0gc2luZ2xldG9uXG4vLyB1c2FnZSBpcyBieSBkZXBlbmRlbmN5IGluamVjdGlvbiBvciBwb3NzaWJseSBieSBpbXBvcnQ6XG4vLyBpbXBvcnQge2dyYXBoaWNzfSBmcm9tICcuL3NlcnZpY2VzL2dyYXBoaWNzJztcblxuaW1wb3J0IHtHcmlkfSBmcm9tICcuLi9hY3RvcnMvR3JpZCc7XG5cblxuXG4vLyBjbG9zdXJlIHZhcnNcbnZhciBncmFwaGljczpHcmFwaGljcyxcbiAgICBjYW1lcmE6VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIDkwLCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4wMDEsIDEwMDAgKSxcbiAgICByZW5kZXJlcjpUSFJFRS5XZWJHTFJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGFjZVwiKSwgY2FtZXJhKSxcbiAgICBzY2VuZTpUSFJFRS5TY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG5cbmNsYXNzIEdyYXBoaWNzIHtcblxuICAvL++/vWRlZmF1bHQgY2FtZXJhXG4gIGNhbWVyYShmb3Y6bnVtYmVyID0gOTAsIGFzcGVjdDpudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aC93aW5kb3cuaW5uZXJIZWlnaHQsIG5lYXI6bnVtYmVyID0gMC4wMDEsIGZhcjpudW1iZXIgPSAxMDAwLjApOlRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhIHtcblxuICAgIHJldHVybiBjYW1lcmE7XG4gIH1cblxuICAvLyBkZWZhdWx0IHJlbmRlcmVyIFxuICByZW5kZXJlcih3aWR0aDpudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0Om51bWJlciA9IHdpbmRvdy5pbm5lckhlaWdodCk6IFRIUkVFLldlYkdMUmVuZGVyZXIge1xuICAgIFxuICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCApO1xuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG4gICAgXG4gIC8vIG1ldGEtY29udGFpbmVyIGZvciBhbGwgZ3JhcGhpY3NcbiAgc2NlbmUoKTpUSFJFRS5TY2VuZSB7XG5cbiAgICAvLyByZXR1cm4gbWV0YS1jb250YWluZXIgLSAnc2NlbmUnXG4gICAgcmV0dXJuIHNjZW5lO1xuICB9XG5cblxuICAvLyBjcmVhdGUgYW5kIHJldHVybiBncmlkXG4gIGFzeW5jIGdyaWQoKTpUSFJFRS5HcmlkSGVscGVyIHtcbiAgICB2YXIgZ3JpZDpUSFJFRS5HcmlkSGVscGVyO1xuXG4gICAgY29uc29sZS5sb2coYEdyaWQgPWApO1xuICAgIGNvbnNvbGUuZGlyKEdyaWQpO1xuICAgIHRyeXtcbiAgICAgIGdyaWQgPSBhd2FpdCBHcmlkLmNyZWF0ZSgpO1xuICAgICAgY29uc29sZS5sb2coYGdyaWQgPWApO1xuICAgICAgY29uc29sZS5kaXIoZ3JpZCk7XG4gICAgICBjb25zb2xlLmxvZyhgYWRkaW5nIGdyaWQgdG8gc2NlbmUgPSAke3NjZW5lfWApO1xuICAgICAgc2NlbmUuYWRkKGdyaWQpO1xuICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfWNhdGNoKGUpe1xuICAgICAgY29uc29sZS5sb2coYGZhaWxlZCB0byBjcmVhdGUgZ3JpZDogJHtlfWApO1xuICAgIH1cbiAgfSAgICAgIFxuXG59Ly9HcmFwaGljc1xuXG5cblxuLy8gZW5mb3JjZSBzaW5nbGV0b24gZXhwb3J0XG5pZihncmFwaGljcyA9PT0gdW5kZWZpbmVkKXtcbiAgZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3MoKTtcbn1cblxuZXhwb3J0IHtncmFwaGljc307XG4iXX0=
