System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Grid;
    return {
        setters: [],
        execute: function () {
            // grid.ts
            exports_1("Grid", Grid = {
                create: (options = {
                        size: 400,
                        divisions: 100,
                        centerLineColor: 0x0000ff,
                        gridColor: 0x808080,
                        x: 0,
                        y: 0,
                        z: 0
                    }) => {
                    console.log(`grid.create() options= `);
                    console.dir(options);
                    var promise = new Promise((resolve, reject) => {
                        try {
                            var grid = new THREE.GridHelper(options['size'], options['divisions'], options['centerLineColor'], options['gridColor']);
                            grid.position.x = options['x'];
                            grid.position.y = options['y'];
                            grid.position.z = options['z'];
                            grid.rotateX(Math.PI / 2.0);
                            // add scale function - LATER send vec3 <sx,sy,sz> as attribute to GPU
                            grid['_scale'] = (sx = 1.0, sy = 1.0, sz = 1.0) => {
                                console.log(`scale: sx=${sx} sy=${sy} sz=${sz}`);
                            };
                            resolve(grid);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    return promise;
                }
            });
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjdG9ycy9ncmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFBQSxVQUFVO1lBQ1Ysa0JBQVcsSUFBSSxHQUFHO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxVQUFjO3dCQUNyQixJQUFJLEVBQUUsR0FBRzt3QkFDVCxTQUFTLEVBQUMsR0FBRzt3QkFDYixlQUFlLEVBQUUsUUFBUTt3QkFDekIsU0FBUyxFQUFFLFFBQVE7d0JBQ25CLENBQUMsRUFBRSxDQUFDO3dCQUNKLENBQUMsRUFBRSxDQUFDO3dCQUNKLENBQUMsRUFBRSxDQUFDO3FCQUFFLEVBQTRCLEVBQUU7b0JBRWxDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztvQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFckIsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7d0JBRTVDLElBQUcsQ0FBQzs0QkFDRixJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs0QkFDekgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUUxQixzRUFBc0U7NEJBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQVUsR0FBRyxFQUFDLEtBQVUsR0FBRyxFQUFDLEtBQVUsR0FBRyxFQUFPLEVBQUU7Z0NBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ25ELENBQUMsQ0FBQzs0QkFFRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hCLENBQUM7d0JBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQzs0QkFDUixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1osQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUNqQixDQUFDO2FBQ0osRUFBQztRQUNGLENBQUMiLCJmaWxlIjoiYWN0b3JzL2dyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBncmlkLnRzXG5leHBvcnQgdmFyIEdyaWQgPSB7XG4gIGNyZWF0ZTogKG9wdGlvbnM6YW55ID0ge1xuICAgIHNpemU6IDQwMCwgXG4gICAgZGl2aXNpb25zOjEwMCwgXG4gICAgY2VudGVyTGluZUNvbG9yOiAweDAwMDBmZiwgXG4gICAgZ3JpZENvbG9yOiAweDgwODA4MCwgXG4gICAgeDogMCwgXG4gICAgeTogMCwgXG4gICAgejogMCB9KTpQcm9taXNlPFRIUkVFLkdyaWRIZWxwZXI+ID0+IHtcblxuICAgICAgY29uc29sZS5sb2coYGdyaWQuY3JlYXRlKCkgb3B0aW9ucz0gYCk7XG4gICAgICBjb25zb2xlLmRpcihvcHRpb25zKTtcblxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgdHJ5e1xuICAgICAgICAgIHZhciBncmlkID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIob3B0aW9uc1snc2l6ZSddLCBvcHRpb25zWydkaXZpc2lvbnMnXSwgb3B0aW9uc1snY2VudGVyTGluZUNvbG9yJ10sIG9wdGlvbnNbJ2dyaWRDb2xvciddKTtcbiAgICAgICAgICBncmlkLnBvc2l0aW9uLnggPSBvcHRpb25zWyd4J107XG4gICAgICAgICAgZ3JpZC5wb3NpdGlvbi55ID0gb3B0aW9uc1sneSddO1xuICAgICAgICAgIGdyaWQucG9zaXRpb24ueiA9IG9wdGlvbnNbJ3onXTtcbiAgICAgICAgICBncmlkLnJvdGF0ZVgoTWF0aC5QSS8yLjApO1xuXG4gICAgICAgICAgLy8gYWRkIHNjYWxlIGZ1bmN0aW9uIC0gTEFURVIgc2VuZCB2ZWMzIDxzeCxzeSxzej4gYXMgYXR0cmlidXRlIHRvIEdQVVxuICAgICAgICAgIGdyaWRbJ19zY2FsZSddID0gKHN4Om51bWJlcj0xLjAsc3k6bnVtYmVyPTEuMCxzejpudW1iZXI9MS4wKTp2b2lkID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzY2FsZTogc3g9JHtzeH0gc3k9JHtzeX0gc3o9JHtzen1gKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmVzb2x2ZShncmlkKTtcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59O1xuIl19
