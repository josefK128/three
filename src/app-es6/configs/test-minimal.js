System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config;
    return {
        setters: [],
        execute: function () {
            config = {
                _map: '',
                _controls: '',
                controlsOptions: {},
                canvas_id: 'space',
                clearColor: 'white',
                alpha: 1.0,
                antialias: true
            };
            exports_1("config", config);
        }
    };
});

