System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Sprite;
    return {
        setters: [],
        execute: function () {
            exports_1("Sprite", Sprite = {
                create: (options = { x: 0, y: 4.0, z: 0.0, sx: 1, sy: 1 }) => {
                    console.log(`sprite.create() options= `);
                    console.dir(options);
                    var sprite_m, sprite, opacity = options['opacity'] || 1.0, promise = new Promise((resolve, reject) => {
                        try {
                            (new THREE.TextureLoader()).load('./assets/images/sprite_redlight.png', (texture) => {
                                console.log(`&&& texture = ${texture}`);
                                sprite_m = new THREE.SpriteMaterial({
                                    map: texture,
                                    color: 0xffffff
                                });
                                sprite = new THREE.Sprite(sprite_m);
                                sprite.scale.set(options.sx, options.sy, 1);
                                sprite.position.set(options.x, options.y, options.z);
                                resolve(sprite);
                            });
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

