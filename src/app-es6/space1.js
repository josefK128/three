System.register(["./services/graphics"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var graphics_1, space, options, Space;
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
                    graphics_1.graphics.init(config);
                    graphics_1.graphics.create('grid', 'grid1', 0, options);
                    graphics_1.graphics.create('quad', 'quad1', 1, options);
                    graphics_1.graphics.create('quad_shm', 'quad_shm1', 1, options);
                    graphics_1.graphics.create('sprite', 'sprite1', 2, options);
                    graphics_1.graphics.create('line', 'line1', 3, options);
                    setTimeout(() => {
                        console.log(`\n*** graphics.dollyX(-10.0) & extend line vertices`);
                        console.log(`expand the visible vertices of 'line1'`);
                        graphics_1.graphics.dollyX(-10.0);
                        graphics_1.graphics.actor('line1').geometry.setDrawRange(0, 90);
                        setTimeout(() => {
                            console.log(`*** scaling entire stage by sy=0.5`);
                            graphics_1.graphics.scaleActor('stage', 1.0, 0.5, 1.0);
                            graphics_1.graphics.scaleActor('grid1', 1.0, 1.0, 0.5);
                            setTimeout(() => {
                                console.log(`*** scaling each actor by sy=1.0 - re-normalize`);
                                graphics_1.graphics.scaleActor('stage', 1.0, 1.0, 1.0);
                                setTimeout(() => {
                                    console.log(`\n*** graphics.dollyX(10.0)`);
                                    graphics_1.graphics.dollyX(10.0);
                                }, 10000);
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

