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
                    layer_type: ['ohlc', 'study', 'study', 'study', 'study', 'study', 'study', 'study'],
                    layers: [
                        [{ name: 'grid0', type: 'grid', layer: 0, options: {
                                    size: 100000, divisions: 10000,
                                    centerLineColor: 0x000000, gridColor: 0x808000,
                                    x: 0, y: 0, z: 0
                                } }
                        ],
                        [{ name: 'study1', type: 'study', layer: 1, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 40, 0, -20, 70, 0]
                                } }
                        ],
                        [{ name: 'study2', type: 'study', layer: 2, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 50, 0, -20, 60, 0]
                                } },
                        ],
                        [{ name: 'study3', type: 'study', layer: 3, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 60, 0, -20, 50, 0]
                                } },
                        ],
                        [{ name: 'study4', type: 'study', layer: 4, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 70, 0, -20, 40, 0]
                                } },
                        ],
                        [{ name: 'study5', type: 'study', layer: 5, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 80, 0, -20, 30, 0],
                                } },
                        ],
                        [{ name: 'study6', type: 'study', layer: 6, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 90, 0, -20, 20, 0],
                                } },
                        ],
                        [{ name: 'study7', type: 'study', layer: 7, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 100, 0, -20, 10, 0],
                                } },
                            { name: 'axes7', type: 'axes', layer: 7, options: { size: 3000 } }
                        ]
                    ]
                }
            };
            exports_1("config", config);
        }
    };
});

