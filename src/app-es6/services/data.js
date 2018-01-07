System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var data, Data;
    return {
        setters: [],
        execute: function () {
            Data = class Data {
                synthesize(first_dynamic_index, nglyphs, deltaX, meanY) {
                    console.log(`\ndata.synthesize:`);
                    console.log(`first_dynamic_index = ${first_dynamic_index}`);
                    console.log(`nglyphs = ${nglyphs}`);
                    console.log(`deltaX = ${deltaX}`);
                    console.log(`meanY = ${meanY}`);
                    return {};
                } 
            }; 
            if (data === undefined) {
                exports_1("data", data = new Data());
            }
        }
    };
});

