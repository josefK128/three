System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Sprite;
    return {
        setters: [],
        execute: function () {
            exports_1("Sprite", Sprite = {
                create: (options = { x: -100, y: 120.0, z: 0.0, sx: 10, sy: 20 }) => {
                    console.log(`\n\n &&& sprite.create() options= `);
                    console.dir(options);
                    var sprite_m, sprite, loader = new THREE.TextureLoader(), texture, opacity = options['opacity'] || 1.0;
                    return new Promise((resolve, reject) => {
                        try {
                            texture = loader.load('./assets/images/three.png');
                            console.log(`\n\n &&& texture = ${texture}`);
                            sprite_m = new THREE.SpriteMaterial({
                                map: texture,
                                color: 0xffffff
                            });
                            sprite = new THREE.Sprite(sprite_m);
                            sprite.scale.set(options.sx, options.sy, 1);
                            sprite.position.set(options.x, options.y, options.z);
                            console.log(`\n\n &&& resolve sprite = ${sprite}`);
                            resolve(sprite);
                        }
                        catch (e) {
                            console.log(`\n\n &&& error ${e} loading texture`);
                            reject(e);
                        }
                    }); 
                } 
            });
        }
    };
});

