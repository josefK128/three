System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Axes;
    return {
        setters: [],
        execute: function () {
            exports_1("Axes", Axes = {
                create: (options = { size: 1 }) => {
                    console.log(`axes.create() options= `);
                    console.dir(options);
                    var axes, promise = new Promise((resolve, reject) => {
                        try {
                            axes = new THREE.AxesHelper(options['size']);
                            resolve(axes);
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

