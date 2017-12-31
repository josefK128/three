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
                    layerDelta: 0.5,
                    layers: [
                        [{ name: 'grid0', type: 'grid', layer: 0, options: {
                                    size: 1000, divisions: 1000,
                                    centerLineColor: 0x000000, gridColor: 0x808000,
                                    x: 0, y: 0, z: 0
                                } },
                            { name: 'line0', type: 'line', layer: 0, options: undefined }
                        ],
                        [{ name: 'line1', type: 'line', layer: 1, options: undefined }],
                        [{ name: 'line2', type: 'line', layer: 2, options: undefined }],
                        [{ name: 'line3', type: 'line', layer: 3, options: undefined }],
                        [{ name: 'line4', type: 'line', layer: 4, options: undefined }],
                        [{ name: 'line5', type: 'line', layer: 5, options: undefined }],
                        [{ name: 'line6', type: 'line', layer: 6, options: undefined }],
                        [{ name: 'axes7', type: 'axes', layer: 7, options: { size: 3000 } }]
                    ]
                }
            };
            exports_1("config", config);
        }
    };
});

