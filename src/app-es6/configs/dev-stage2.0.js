System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config;
    return {
        setters: [],
        execute: function () {
            config = {
                _app: './app-es6/space2',
                camera: {
                    fov: 90,
                    near: 0.5,
                    far: 100000,
                    position: { x: -100, y: 80, z: 100 },
                    lookAt: { x: -100, y: 80, z: 0 },
                },
                stage: {
                    layerDelta: 5.0,
                    layer_type: ['line', 'line', 'line', 'line', 'line', 'line', 'line', 'line'],
                    layers: [
                        [{ name: 'grid0', type: 'grid', layer: 0, options: {
                                    size: 200000, divisions: 20000,
                                    centerLineColor: 0x000000, gridColor: 0x808000,
                                    x: 0, y: 0, z: 0
                                } },
                            { name: 'ohlc0', type: 'ohlc', layer: 0, options: {
                                    first_dynamic_index: 0,
                                    width: 2.0,
                                    xpositions: [0, -5, -10, -15, -20.0, -25.0, -30.0, -35, -40, -45,
                                        -50, -55, -60, -65, -70.0, -75.0, -80.0, -85, -90, -95],
                                    data: [130.0, 160.0, 10, 140.0,
                                        160.0, 180.0, 30.0, 150.0,
                                        140.0, 190.0, 100.0, 150.0,
                                        160.0, 180.0, 30.0, 150.0,
                                        140.0, 190.0, 10.0, 150.0,
                                        160.0, 180.0, 30.0, 150.0,
                                        140.0, 190.0, 10.0, 150.0,
                                        160.0, 180.0, 30.0, 150.0,
                                        140.0, 190.0, 10.0, 150.0,
                                        160.0, 180.0, 30.0, 150.0,
                                        140.0, 190.0, 10.0, 150.0,
                                        140.0, 190.0, 10.0, 150.0,
                                        140.0, 190.0, 10.0, 150.0,
                                        160.0, 180.0, 30.0, 150.0,
                                        140.0, 190.0, 10.0, 150.0,
                                        140.0, 190.0, 10.0, 150.0
                                    ]
                                } }
                        ],
                        [{ name: 'line1', type: 'line', layer: 1, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 40, 0, -20, 70, 0]
                                } }
                        ],
                        [{ name: 'line2', type: 'line', layer: 2, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 50, 0, -20, 60, 0]
                                } },
                        ],
                        [{ name: 'line3', type: 'line', layer: 3, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 60, 0, -20, 50, 0]
                                } },
                        ],
                        [{ name: 'line4', type: 'line', layer: 4, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 70, 0, -20, 40, 0]
                                } },
                        ],
                        [{ name: 'line5', type: 'line', layer: 5, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 80, 0, -20, 30, 0],
                                } },
                        ],
                        [{ name: 'line6', type: 'line', layer: 6, options: {
                                    max_vertices: 500,
                                    drawCount: 500,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -10, 90, 0, -20, 20, 0],
                                } },
                        ],
                        [{ name: 'line7', type: 'line', layer: 7, options: {
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

