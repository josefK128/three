System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Grid;
    return {
        setters: [],
        execute: function () {
            exports_1("Grid", Grid = {
                create: (options = {
                        size: 100,
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

