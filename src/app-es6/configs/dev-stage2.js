System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config;
    return {
        setters: [],
        execute: function () {
            config = {
                _app: './app-es6/space2',
                stage: {
                    layerDelta: 5.0,
                    layers: [
                        [{ name: 'grid0', type: 'grid', layer: 0, options: {
                                    size: 1000, divisions: 1000,
                                    centerLineColor: 0x000000, gridColor: 0x808000,
                                    x: 0, y: 0, z: 0
                                } },
                            { name: 'line0', type: 'line', layer: 0, options: {
                                    max_vertices: 200,
                                    drawCount: 200,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -3, 4, 0, -6, 1, 0]
                                } }
                        ],
                        [{ name: 'line1', type: 'line', layer: 1, options: {
                                    max_vertices: 200,
                                    drawCount: 200,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -3, 4, 0, -6, 1, 0]
                                } }
                        ],
                        [{ name: 'line2', type: 'line', layer: 2, options: {
                                    max_vertices: 200,
                                    drawCount: 200,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -3, 4, 0, -6, 1, 0]
                                } },
                        ],
                        [{ name: 'line3', type: 'line', layer: 3, options: {
                                    max_vertices: 200,
                                    drawCount: 200,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -3, 4, 0, -6, 1, 0]
                                } },
                        ],
                        [{ name: 'line4', type: 'line', layer: 4, options: {
                                    max_vertices: 200,
                                    drawCount: 200,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -3, 4, 0, -6, 1, 0]
                                } },
                        ],
                        [{ name: 'line5', type: 'line', layer: 5, options: {
                                    max_vertices: 200,
                                    drawCount: 200,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -3, 4, 0, -6, 1, 0],
                                } },
                        ],
                        [{ name: 'line6', type: 'line', layer: 6, options: {
                                    max_vertices: 200,
                                    drawCount: 200,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -3, 4, 0, -6, 1, 0],
                                } },
                        ],
                        [{ name: 'line7', type: 'line', layer: 7, options: {
                                    max_vertices: 200,
                                    drawCount: 200,
                                    color: 0xff00ff,
                                    linewidth: 30,
                                    vertices: [0, 0, 0, -3, 4, 0, -6, 1, 0],
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

