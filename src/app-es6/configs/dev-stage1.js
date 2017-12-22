System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config;
    return {
        setters: [],
        execute: function () {
            config = {
                _app: './app-es6/space',
                nLayers: 4,
                layerDelta: 0.5
            };
            exports_1("config", config);
        }
    };
});

