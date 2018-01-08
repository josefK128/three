System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var data, Data;
    return {
        setters: [],
        execute: function () {
            Data = class Data {
                synthesize(symbol, first_dynamic_index = 0, nglyphs = 10000, deltaX = 5, meanO = 60, meanH = 100, meanL = 20, meanC = 60) {
                    var xpositions = [], data = [], i, j;
                    for (i = 0; i < nglyphs; i++) {
                        xpositions[i] = -i * deltaX;
                        j = 4 * i;
                        data[j] = meanO + 20 * Math.random() - 10.0;
                        data[j + 1] = meanH + 10 * Math.random() - 5.0;
                        data[j + 2] = meanL + 10 * Math.random() - 5.0;
                        data[j + 3] = meanC + 20 * Math.random() - 10.0;
                    }
                    return { symbol: symbol, first_dynamic_index: first_dynamic_index, width: deltaX * 0.4, xpositions: xpositions, data: data };
                } 
            }; 
            if (data === undefined) {
                exports_1("data", data = new Data());
            }
        }
    };
});

