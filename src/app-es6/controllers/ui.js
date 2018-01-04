System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ui, graphics, initial_view, flatten_view, railsv, rails, dollyX_, zoomX_, zoomY_, symbolv, symbols, layersv, layers, layername, show_layer, mod_present, add_present, add_past, gui, stop, events, Ui;
    return {
        setters: [],
        execute: function () {
            layername = [], show_layer = {};
            Ui = class Ui {
                init(_graphics, config = {}) {
                    graphics = _graphics;
                    initial_view = { initial_view: () => { console.log(`\ninitial_view`); } };
                    flatten_view = { flatten_view: () => { console.log(`\nflatten_view`); } };
                    railsv = false; 
                    rails = { rails: false };
                    dollyX_ = { dollyX_: -10.0 };
                    zoomX_ = { zoomX_: -10.0 };
                    zoomY_ = { zoomY_: -20 };
                    symbolv = ['ETH', 'ETC', 'BTC', 'BCH', 'LTC', 'LBC', 'XRP', 'ZEC', 'BST', 'UJO'];
                    symbols = {
                        symbol: 'ETH',
                    };
                    layersv = true; 
                    layers = { layers: true };
                    for (let l = 0; l < config.stage.show_layer.length; l++) {
                        layername[l] = `show_layer_${l}`;
                        show_layer[layername[l]] = config.stage.show_layer[l];
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
                    });
                    gui.add(flatten_view, 'flatten_view').onFinishChange(() => {
                        console.log(`flatten the view to 2D orthogonal to camera.lookAt ray`);
                    });
                    gui.add(rails, 'rails').onFinishChange(() => {
                        railsv = !railsv;
                        console.log(`\nrails boolean value set to ${railsv}`);
                    });
                    gui.add(dollyX_, 'dollyX_', -190, -10).onChange(() => {
                        console.log(`current dollyX_ value = = ${dollyX_['dollyX_']}`);
                    });
                    gui.add(zoomX_, 'zoomX_', -200, -20).onChange(() => {
                        console.log(`current zoomX_ value = = ${zoomX_['zoomX_']}`);
                    });
                    gui.add(zoomY_, 'zoomY_', -200, -20).onChange(() => {
                        console.log(`current zoomY_ value = = ${zoomY_['zoomY_']}`);
                    });
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
                        gui.add(show_layer, layername[l]).onFinishChange(() => {
                            config.stage.show_layer[l] = !config.stage.show_layer[l];
                            if (config.stage.show_layer[l]) {
                                graphics.showLayer(l);
                            }
                            else {
                                graphics.hideLayer(l);
                            }
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

