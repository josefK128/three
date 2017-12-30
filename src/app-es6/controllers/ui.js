System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ui, graphics, initial_view, flatten_view, railsv, rails, dollyX_, zoomX_, scaleX_, symbolv, symbols, layersv, layers, mod_present, add_present, add_past, gui, stop, events, Ui;
    return {
        setters: [],
        execute: function () {
            Ui = class Ui {
                init(_graphics, config = {}) {
                    graphics = _graphics;
                    initial_view = { initial_view: () => { console.log(`initial_view`); } };
                    flatten_view = { flatten_view: () => { console.log(`flatten_view`); } };
                    railsv = false; 
                    rails = { rails: railsv = !railsv };
                    dollyX_ = { dollyX_: -10.0 };
                    zoomX_ = { zoomX_: -10.0 };
                    scaleX_ = { scaleX_: -20 };
                    symbolv = ['ETH', 'BTC', 'LTC', 'LBC', 'BST', 'UJO'];
                    symbols = {
                        symbol: 'ETH',
                    };
                    layersv = true; 
                    layers = { layers: layersv = !layersv };
                    mod_present = { mod_present: () => { console.log(`mod_present`); } };
                    add_present = { add_present: () => { console.log(`add_present`); } };
                    add_past = { add_past: () => { console.log(`add_past`); } };
                    gui = new dat.GUI();
                    stop = (e) => {
                        console.log(`stop propagation of event ${e.type}`);
                        e.stopPropagation();
                    };
                    events = ["mousedown"];
                    console.log(`\n gui.domElement = `);
                    console.dir(gui.domElement);
                    for (let e of events) {
                        gui.domElement.addEventListener(e, stop, false);
                    }
                    gui.add(initial_view, 'initial_view');
                    gui.add(flatten_view, 'flatten_view');
                    gui.add(rails, 'rails');
                    gui.add(dollyX_, 'dollyX_', -190, -10);
                    gui.add(zoomX_, 'zoomX_', -200, -20);
                    gui.add(scaleX_, 'scaleX_');
                    gui.add(symbols, 'symbol', symbolv).onFinishChange(() => {
                        console.log(`current symbol = ${symbols['symbol']}`);
                    });
                    gui.add(layers, 'layers');
                    gui.add(mod_present, 'mod_present');
                    gui.add(add_present, 'add_present');
                    gui.add(add_past, 'add_past');
                } 
            }; 
            if (ui === undefined) {
                exports_1("ui", ui = new Ui());
            }
        }
    };
});

