// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var graphics, camera, renderer, scene, Graphics;
    return {
        setters: [],
        execute: function () {// graphics.ts - Three.js graphics service - singleton
            // usage is by dependency injection or possibly by import:
            // import {graphics} from './services/graphics';
            // closure vars
            camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 1000), renderer = new THREE.WebGLRenderer(document.getElementById("space"), camera), scene = new THREE.Scene();
            Graphics = class Graphics {
                //�default camera
                camera(fov = 90, aspect = window.innerWidth / window.innerHeight, near = 0.001, far = 1000.0) {
                    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
                    return camera;
                }
                // default renderer 
                renderer(width = window.innerWidth, height = window.innerHeight) {
                    var renderer = new THREE.WebGLRenderer(document.getElementById("space"));
                    renderer.setSize(width, height);
                    return renderer;
                }
                // meta-container for all graphics
                scene() {
                    var scene = new THREE.Scene();
                    // return meta-container - 'scene'
                    return scene;
                }
            }; //Graphics
            // enforce singleton export
            if (graphics === undefined) {
                exports_1("graphics", graphics = new Graphics());
            }
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dyYXBoaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsZ0RBQWdEOzs7Ozs7OzhCQUZoRCxzREFBc0Q7WUFDdEQsMERBQTBEO1lBQzFELGdEQUFnRDtZQUdoRCxlQUFlO1lBRVgsTUFBTSxHQUEyQixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUUsRUFDdkgsUUFBUSxHQUF1QixJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsRUFDaEcsS0FBSyxHQUFlLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRzFDLFdBQUE7Z0JBRUUsaUJBQWlCO2dCQUNqQixNQUFNLENBQUMsTUFBYSxFQUFFLEVBQUUsU0FBZ0IsTUFBTSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsV0FBVyxFQUMxRSxPQUFjLEtBQUssRUFBRSxNQUFhLE1BQU07b0JBRXhDLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNqRSxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELG9CQUFvQjtnQkFDcEIsUUFBUSxDQUFDLFFBQWUsTUFBTSxDQUFDLFVBQVUsRUFDaEMsU0FBZ0IsTUFBTSxDQUFDLFdBQVc7b0JBRXpDLElBQUksUUFBUSxHQUF1QixJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUU3RixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUUsQ0FBQztvQkFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDbEIsQ0FBQztnQkFHRCxrQ0FBa0M7Z0JBQ2xDLEtBQUs7b0JBRUgsSUFBSSxLQUFLLEdBQWUsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRTFDLGtDQUFrQztvQkFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDZixDQUFDO2FBQ0YsQ0FBQSxDQUFBLFVBQVU7WUFJWCwyQkFBMkI7WUFDM0IsRUFBRSxDQUFBLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3pCLHNCQUFBLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxFQUFDO1lBQzVCLENBQUM7UUFLRCxDQUFDIiwiZmlsZSI6InNlcnZpY2VzL2dyYXBoaWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZ3JhcGhpY3MudHMgLSBUaHJlZS5qcyBncmFwaGljcyBzZXJ2aWNlIC0gc2luZ2xldG9uXG4vLyB1c2FnZSBpcyBieSBkZXBlbmRlbmN5IGluamVjdGlvbiBvciBwb3NzaWJseSBieSBpbXBvcnQ6XG4vLyBpbXBvcnQge2dyYXBoaWNzfSBmcm9tICcuL3NlcnZpY2VzL2dyYXBoaWNzJztcblxuXG4vLyBjbG9zdXJlIHZhcnNcbnZhciBncmFwaGljczpHcmFwaGljcyxcbiAgICBjYW1lcmE6VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIDkwLCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4wMDEsIDEwMDAgKSxcbiAgICByZW5kZXJlcjpUSFJFRS5XZWJHTFJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGFjZVwiKSwgY2FtZXJhKSxcbiAgICBzY2VuZTpUSFJFRS5TY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG5cbmNsYXNzIEdyYXBoaWNzIHtcblxuICAvL++/vWRlZmF1bHQgY2FtZXJhXG4gIGNhbWVyYShmb3Y6bnVtYmVyID0gOTAsIGFzcGVjdDpudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aC93aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbmVhcjpudW1iZXIgPSAwLjAwMSwgZmFyOm51bWJlciA9IDEwMDAuMCk6VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEge1xuICAgIFxuICAgIHZhciBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoZm92LCBhc3BlY3QsIG5lYXIsIGZhcik7XG4gICAgcmV0dXJuIGNhbWVyYTtcbiAgfVxuXG4gIC8vIGRlZmF1bHQgcmVuZGVyZXIgXG4gIHJlbmRlcmVyKHdpZHRoOm51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoLCBcbiAgICAgICAgICAgaGVpZ2h0Om51bWJlciA9IHdpbmRvdy5pbm5lckhlaWdodCk6IFRIUkVFLldlYkdMUmVuZGVyZXIge1xuICAgIFxuICAgIHZhciByZW5kZXJlcjpUSFJFRS5XZWJHTFJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGFjZVwiKSk7XG5cbiAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQgKTtcbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cblxuICAgIFxuICAvLyBtZXRhLWNvbnRhaW5lciBmb3IgYWxsIGdyYXBoaWNzXG4gIHNjZW5lKCk6VEhSRUUuU2NlbmUge1xuXG4gICAgdmFyIHNjZW5lOlRIUkVFLlNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICAvLyByZXR1cm4gbWV0YS1jb250YWluZXIgLSAnc2NlbmUnXG4gICAgcmV0dXJuIHNjZW5lO1xuICB9XG59Ly9HcmFwaGljc1xuXG5cblxuLy8gZW5mb3JjZSBzaW5nbGV0b24gZXhwb3J0XG5pZihncmFwaGljcyA9PT0gdW5kZWZpbmVkKXtcbiAgZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3MoKTtcbn1cblxuZXhwb3J0IHtncmFwaGljc307XG5cblxuIl19
