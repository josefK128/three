System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var create;
    return {
        setters: [],
        execute: function () {
            // unitcube.ts
            exports_1("create", create = (options = {}) => {
                var cube_g, cube_m, cube, 
                // options
                wireframe = options['wireframe'] || false, color = options['color'] || 'red', opacity = options['opacity'] || 1.0;
                return new Promise((resolve, reject) => {
                    cube_g = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0);
                    cube_m = new THREE.MeshBasicMaterial({
                        wireframe: wireframe,
                        color: color,
                        transparent: true,
                        opacity: opacity,
                        side: THREE.DoubleSide
                    });
                    cube_m.blendSrc = THREE.SrcAlphaFactor; // default
                    cube_m.blendDst = THREE.OneMinusSrcAlphaFactor; //default
                    //cube_m.depthTest = false;
                    cube = new THREE.Mesh(cube_g, cube_m);
                    // delta method for modifying properties
                    cube['delta'] = (options = {}) => {
                        cube_m.wireframe = options['wireframe'] || cube_m.wireframe;
                        cube_m.color = options['color'] || cube_m.color;
                        cube_m.transparent = options['transparent'] || cube_m.transparent;
                    };
                    // render method - not needed in this case
                    //cube['render'] = (et:number=0, options:Object={}) => {}
                    // return actor ready to be added to scene
                    resolve(cube);
                }); //return new Promise
            });
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdG9ycy91bml0Y3ViZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsY0FBYztZQUNkLG9CQUFXLE1BQU0sR0FBRyxDQUFDLFVBQWUsRUFBRSxFQUFFLEVBQUU7Z0JBQ3hDLElBQUksTUFBcUIsRUFDckIsTUFBcUIsRUFDckIsSUFBZTtnQkFDZixVQUFVO2dCQUNWLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxFQUN6QyxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssRUFDakMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUM7Z0JBR3hDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFFckMsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3BELE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDOUIsU0FBUyxFQUFFLFNBQVM7d0JBQ3BCLEtBQUssRUFBRSxLQUFLO3dCQUNaLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixPQUFPLEVBQUMsT0FBTzt3QkFDZixJQUFJLEVBQUMsS0FBSyxDQUFDLFVBQVU7cUJBQzFCLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVO29CQUNsRCxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLFNBQVM7b0JBQ3pELDJCQUEyQjtvQkFDM0IsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBR3RDLHdDQUF3QztvQkFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBZSxFQUFFLEVBQUUsRUFBRTt3QkFDcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQzt3QkFDNUQsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDaEQsTUFBTSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQztvQkFDcEUsQ0FBQyxDQUFDO29CQUVGLDBDQUEwQztvQkFDMUMseURBQXlEO29CQUV6RCwwQ0FBMEM7b0JBQzFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFaEIsQ0FBQyxDQUFDLENBQUMsQ0FBQSxvQkFBb0I7WUFDekIsQ0FBQyxFQUFDO1FBQ0gsQ0FBQyIsImZpbGUiOiJhY3RvcnMvdW5pdGN1YmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB1bml0Y3ViZS50c1xuZXhwb3J0IHZhciBjcmVhdGUgPSAob3B0aW9uczpPYmplY3Q9e30pID0+IHtcbiAgdmFyIGN1YmVfZzpUSFJFRS5HZW9tZXRyeSxcbiAgICAgIGN1YmVfbTpUSFJFRS5NYXRlcmlhbCxcbiAgICAgIGN1YmU6VEhSRUUuTWVzaCxcbiAgICAgIC8vIG9wdGlvbnNcbiAgICAgIHdpcmVmcmFtZSA9IG9wdGlvbnNbJ3dpcmVmcmFtZSddIHx8IGZhbHNlLFxuICAgICAgY29sb3IgPSBvcHRpb25zWydjb2xvciddIHx8ICdyZWQnLFxuICAgICAgb3BhY2l0eSA9IG9wdGlvbnNbJ29wYWNpdHknXSB8fCAxLjA7XG4gICAgICBcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgY3ViZV9nID0gbmV3IFRIUkVFLkJveEJ1ZmZlckdlb21ldHJ5KDEuMCwgMS4wLCAxLjApO1xuICAgIGN1YmVfbSA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgICAgIHdpcmVmcmFtZTogd2lyZWZyYW1lLFxuICAgICAgICAgICBjb2xvcjogY29sb3IsICAgICAgICAgICAgXG4gICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICBvcGFjaXR5Om9wYWNpdHksXG4gICAgICAgICAgIHNpZGU6VEhSRUUuRG91YmxlU2lkZVxuICAgICB9KTtcbiAgICAgY3ViZV9tLmJsZW5kU3JjID0gVEhSRUUuU3JjQWxwaGFGYWN0b3I7IC8vIGRlZmF1bHRcbiAgICAgY3ViZV9tLmJsZW5kRHN0ID0gVEhSRUUuT25lTWludXNTcmNBbHBoYUZhY3RvcjsgLy9kZWZhdWx0XG4gICAgIC8vY3ViZV9tLmRlcHRoVGVzdCA9IGZhbHNlO1xuICAgICBjdWJlID0gbmV3IFRIUkVFLk1lc2goY3ViZV9nLCBjdWJlX20pO1xuICBcbiAgXG4gICAgIC8vIGRlbHRhIG1ldGhvZCBmb3IgbW9kaWZ5aW5nIHByb3BlcnRpZXNcbiAgICAgY3ViZVsnZGVsdGEnXSA9IChvcHRpb25zOk9iamVjdD17fSkgPT4ge1xuICAgICAgIGN1YmVfbS53aXJlZnJhbWUgPSBvcHRpb25zWyd3aXJlZnJhbWUnXSB8fCBjdWJlX20ud2lyZWZyYW1lO1xuICAgICAgIGN1YmVfbS5jb2xvciA9IG9wdGlvbnNbJ2NvbG9yJ10gfHwgY3ViZV9tLmNvbG9yO1xuICAgICAgIGN1YmVfbS50cmFuc3BhcmVudCA9IG9wdGlvbnNbJ3RyYW5zcGFyZW50J10gfHwgY3ViZV9tLnRyYW5zcGFyZW50O1xuICAgICB9O1xuICBcbiAgICAgLy8gcmVuZGVyIG1ldGhvZCAtIG5vdCBuZWVkZWQgaW4gdGhpcyBjYXNlXG4gICAgIC8vY3ViZVsncmVuZGVyJ10gPSAoZXQ6bnVtYmVyPTAsIG9wdGlvbnM6T2JqZWN0PXt9KSA9PiB7fVxuICBcbiAgICAgLy8gcmV0dXJuIGFjdG9yIHJlYWR5IHRvIGJlIGFkZGVkIHRvIHNjZW5lXG4gICAgIHJlc29sdmUoY3ViZSk7XG5cbiAgIH0pOy8vcmV0dXJuIG5ldyBQcm9taXNlXG4gfTtcbiJdfQ==
