System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config;
    return {
        setters: [],
        execute: function () {
            config = {
                _app: './app-es6/space',
                camera: {
                    fov: 90,
                    near: 0.5,
                    far: 100000,
                    position: { x: -100, y: 80, z: 100 },
                    lookAt: { x: -100, y: 80, z: 0 },
                },
                stage: {
                    layerDelta: 5.0,
                    layer_type: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
                    layers: [
                        [{ name: 'grid0', type: 'grid', layer: 0, options: {
                                    size: 100000, divisions: 10000,
                                    centerLineColor: 0x000000, gridColor: 0x808000,
                                    x: 0, y: 0, z: 0
                                } }
                        ],
                        [{ name: 'null1', type: 'null', layer: 1, options: {} }],
                        [{ name: 'null2', type: 'null', layer: 2, options: {} }],
                        [{ name: 'null3', type: 'null', layer: 3, options: {} }],
                        [{ name: 'null4', type: 'null', layer: 4, options: {} }],
                        [{ name: 'null5', type: 'null', layer: 5, options: {} }],
                        [{ name: 'null6', type: 'null', layer: 6, options: {} }],
                        [{ name: 'axes7', type: 'axes', layer: 7, options: { size: 5000 } }]
                    ]
                }
            };
            exports_1("config", config);
        }
    };
});

