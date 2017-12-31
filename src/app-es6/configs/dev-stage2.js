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
                        [{ name: 'grid1', type: 'grid', layer: 0, options: {
                                    size: 1000, divisions: 1000,
                                    centerLineColor: 0x0000ff, gridColor: 0x808000,
                                    x: 0, y: 0, z: 0
                                } },
                            { name: 'axes1', type: 'axes', layer: 0, options: { size: 1000 } }
                        ]
                    ]
                }
            };
            exports_1("config", config);
        }
    };
});

