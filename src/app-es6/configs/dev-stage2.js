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
                        [{ name: 'grid1', type: 'grid', layer: 0, options: undefined }]
                    ]
                }
            };
            exports_1("config", config);
        }
    };
});

