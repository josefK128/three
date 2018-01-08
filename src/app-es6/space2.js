System.register(["./services/graphics", "./controllers/ui"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var graphics_1, ui_1, space, options, Space;
    return {
        setters: [
            function (graphics_1_1) {
                graphics_1 = graphics_1_1;
            },
            function (ui_1_1) {
                ui_1 = ui_1_1;
            }
        ],
        execute: function () {
            Space = class Space {
                init(config = {}) {
                    console.log(`space.init: config = `);
                    console.dir(config);
                    graphics_1.graphics.init(config);
                    for (let layer of config.stage['layers']) {
                        for (let actor of layer) {
                            console.log(`layer ${actor['layer']}:creating actor ${actor['name']} type = ${actor['type']}`);
                            graphics_1.graphics.create(actor['type'], actor['name'], actor['layer'], actor['options']);
                        }
                    }
                    ui_1.ui.init(graphics_1.graphics, config);
                    graphics_1.graphics.animate();
                } 
            }; 
            if (space === undefined) {
                exports_1("space", space = new Space());
            }
        }
    };
});

