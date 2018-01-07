System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var data, Data;
    return {
        setters: [],
        execute: function () {
            Data = class Data {
                synthesize(first_dynamic_index = 0, nglyphs = 10, deltaX = 5, meanO = 60, meanH = 100, meanL = 20, meanC = 60) {
                    var xpositions = [], data = [];
                    for (let i = 0; i < nglyphs; i++) {
                        xpositions[i] = -i * deltaX;
                        switch (i % 4) {
                            case 0:
                                data[i] = meanO + 10 * Math.random() - 5.0;
                                break;
                            case 1:
                                data[i] = meanH + 10 * Math.random() - 5.0;
                                break;
                            case 2:
                                data[i] = meanL + 10 * Math.random() - 5.0;
                                break;
                            case 3:
                                data[i] = meanC + 10 * Math.random() - 5.0;
                                break;
                            default:
                                console.log(`error in ${i} mod4 !!!!`);
                        }
                    }
                    return { first_dynamic_index: first_dynamic_index, width: deltaX * 0.4, xpositions: xpositions, data: data };
                } 
            }; 
            if (data === undefined) {
                exports_1("data", data = new Data());
            }
        }
    };
});

