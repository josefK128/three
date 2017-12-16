System.register(["./services/graphics"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var graphics_1, space, Space;
    return {
        setters: [
            function (graphics_1_1) {
                graphics_1 = graphics_1_1;
            }
        ],
        execute: function () {
            Space = class Space {
                init(config = {}) {
                    console.log(`space.init: config = `);
                    console.dir(config);
                    graphics_1.graphics.init();
                    graphics_1.graphics.actor('grid', 'grid1');
                    graphics_1.graphics.actor('line', 'line1');
                    graphics_1.graphics.actor('quad', 'quad1');
                    setTimeout(() => {
                        console.log(`scaling entire stage by sy=0.5`);
                        graphics_1.graphics.scaleActor('stage', 1.0, 0.5, 1.0);
                        console.log(`translating grid x=0 'now' to right edge of window`);
                        console.log(`NOTE: scaling of grid and stage is uniform from origin, not from center of window`);
                        graphics_1.graphics.pastCamera();
                        setTimeout(() => {
                            console.log(`scaling entire stage by sy=1.0 - re-normalize`);
                            graphics_1.graphics.scaleActor('stage', 1.0, 1.0, 1.0);
                            setTimeout(() => {
                                graphics_1.graphics.scaleActor('line1', 1.0, 0.5, 1.0);
                                graphics_1.graphics.scaleActor('quad1', 1.0, 0.5, 1.0);
                                graphics_1.graphics.scaleActor('grid1', 1.0, 1.0, 0.5);
                            }, 10000);
                        }, 10000);
                    }, 10000);
                    graphics_1.graphics.animate();
                } 
            }; 
            if (space === undefined) {
                exports_1("space", space = new Space());
            }
        }
    };
});

