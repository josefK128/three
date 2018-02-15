System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TextNumeric;
    return {
        setters: [],
        execute: function () {
            exports_1("TextNumeric", TextNumeric = {
                create: (options = {
                        text: 'A',
                        x: -10,
                        y: 10,
                        font: 'fonts/helvetiker_regular.typeface.json',
                        size: 80,
                        height: 5,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: 10,
                        bevelSize: 8,
                        bevelSegments: 5
                    }) => {
                    console.log(`text_numeric.create() options= `);
                    console.dir(options);
                    var text_numeric, text = options['text'], loader = new THREE.FontLoader(), font;
                    return new Promise((resolve, reject) => {
                        try {
                            font = loader.load(options['font']);
                            console.log(`&&& font = ${font}`);
                            text_numeric = new THREE.TextBufferGeometry(text, options);
                            text_numeric.position.x = options['x'];
                            text_numeric.position.y = options['y'];
                            console.log(`resoving text_numeric = ${text_numeric}`);
                            resolve(text_numeric);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }); 
                } 
            });
        }
    };
});

