System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ui, config, graphics, camera, controls, initial_view, normalize_scale, railsv, rails, dollyX_, logscaleX_, logscaleY_, sx, sy, symbolv, symbols, layersv, layers, layername, layer_typev, layer_type, mod_present, add_present, add_past, gui, stop, events, Ui;
    return {
        setters: [],
        execute: function () {
            sx = 1.0, sy = 1.0, layername = [], layer_typev = [], layer_type = {};
            Ui = class Ui {
                init(_graphics, _config = {}) {
                    config = _config;
                    graphics = _graphics;
                    camera = graphics.camera();
                    controls = camera['controls'];
                    initial_view = { initial_view: () => { console.log(`\ninitial_view`); } };
                    normalize_scale = { normalize_scale: () => { console.log(`\nnormalize_scale`); } };
                    railsv = false; 
                    rails = { rails: false };
                    dollyX_ = { dollyX_: -50.0 };
                    logscaleX_ = { logscaleX_: 0.0 };
                    logscaleY_ = { logscaleY_: 0.0 };
                    symbolv = ['ETH', 'ETC', 'BTC', 'BCH', 'LTC', 'LBC', 'XRP', 'ZEC', 'BST', 'UJO'];
                    symbols = {
                        symbol: 'ETH',
                    };
                    layersv = true; 
                    layers = { layers: true };
                    layer_typev = ["invisible", "ohlc", "candle", "line", "mountain"];
                    for (let l = 0; l < config.stage.layer_type.length; l++) {
                        layername[l] = `layer_type${l}`;
                        layer_type[layername[l]] = { layer_typev: config.stage.layer_type[l] };
                    }
                    mod_present = { mod_present: () => { console.log(`\nmod_present`); } };
                    add_present = { add_present: () => { console.log(`\nadd_present`); } };
                    add_past = { add_past: () => { console.log(`\nadd_past`); } };
                    gui = new dat.GUI();
                    stop = (e) => {
                        e.stopPropagation();
                    };
                    events = ["mousedown"];
                    console.log(`\n gui.domElement = `);
                    console.dir(gui.domElement);
                    for (let e of events) {
                        gui.domElement.addEventListener(e, stop, false);
                    }
                    gui.add(initial_view, 'initial_view').onFinishChange(() => {
                        console.log(`revert to initial_view`);
                        console.log(`initial_position.x = ${camera['initial_position'].x}`);
                        console.log(`initial_position.y = ${camera['initial_position'].y}`);
                        console.log(`initial_position.z = ${camera['initial_position'].z}`);
                        camera.position.set(camera['initial_position'].x, camera['initial_position'].y, camera['initial_position'].z);
                        controls.update();
                        console.log(`initial_lookAt.x = ${camera['initial_position'].x}`);
                        console.log(`initial_lookAt.y = ${camera['initial_position'].y}`);
                        controls.target.set(camera['initial_position'].x, camera['initial_position'].y, 0.0);
                        dollyX_['dollyX_'] = camera.position.x;
                    });
                    gui.add(normalize_scale, 'normalize_scale').onFinishChange(() => {
                        logscaleX_['logscaleX_'] = 1.0;
                        logscaleY_['logscaleY_'] = 1.0;
                        graphics.scaleActor('stage', 1.0, 1.0, 1.0);
                    });
                    gui.add(rails, 'rails').onFinishChange(() => {
                        railsv = !railsv;
                        console.log(`\nrails boolean value set to ${railsv}`);
                    });
                    gui.add(dollyX_, 'dollyX_', -5000, 50, 1).onChange(() => {
                        graphics.dollyX(dollyX_['dollyX_']);
                    }).listen();
                    gui.add(logscaleX_, 'logscaleX_', -2.0, 2.0, 0.01).onChange(() => {
                        let lsx = logscaleX_['logscaleX_'];
                        sx = Math.exp(lsx);
                        graphics.scaleActor('stage', sx, sy, 1.0);
                    }).listen();
                    gui.add(logscaleY_, 'logscaleY_', -2.0, 2.0, 0.01).onChange(() => {
                        let lsy = logscaleY_['logscaleY_'];
                        sy = Math.exp(lsy);
                        console.log(`current logscaleY_ lsy = ${lsy} sy = ${sy}`);
                        graphics.scaleActor('stage', sx, sy, 1.0);
                    }).listen();
                    gui.add(symbols, 'symbol', symbolv).onFinishChange(() => {
                        console.log(`\ncurrent symbol = ${symbols['symbol']}`);
                    });
                    gui.add(mod_present, 'mod_present').onFinishChange(() => {
                        console.log(`event: modify present glyph`);
                    });
                    gui.add(add_present, 'add_present').onFinishChange(() => {
                        console.log(`event: add to present array of glyphs`);
                    });
                    gui.add(add_past, 'add_past').onFinishChange(() => {
                        console.log(`event: add to past array of glyphs`);
                    });
                    gui.add(layers, 'layers').onFinishChange(() => {
                        layersv = !layersv;
                        console.log(`\nlayers boolean value set to ${layersv}`);
                    });
                    for (let l = 0; l < layername.length; l++) {
                        gui.add(layer_type[layername[l]], 'layer_typev', layer_typev).onFinishChange(() => {
                            console.log(`setting layer_type[${l}] = ${layer_type[layername[l]]['layer_typev']}`);
                            graphics.layer_type(l, layer_type[layername[l]]['layer_typev']);
                        });
                    }
                } 
            }; 
            if (ui === undefined) {
                exports_1("ui", ui = new Ui());
            }
        }
    };
});

