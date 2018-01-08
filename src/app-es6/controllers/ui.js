System.register(["../services/data"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var data_1, ui, config, graphics, camera, ohlc_options, current_symbol, current_layer, initial_view, normalize_scale, normalize_zoom, normalize_pan_tilt, railsv, rails, dollyX_, dollyY_, logscaleX_, logscaleY_, sx, sy, pan_, tilt_, zoom_, symbolv, symbols, layersv, layers, layername, layer_typev, layer_type, mod_present, add_present, add_past, gui, stop, events, Ui;
    return {
        setters: [
            function (data_1_1) {
                data_1 = data_1_1;
            }
        ],
        execute: function () {
            ohlc_options = {}, 
            current_layer = 0, sx = 1.0, sy = 1.0, layername = [], layer_typev = [], layer_type = {};
            Ui = class Ui {
                init(_graphics, _config = {}) {
                    config = _config;
                    graphics = _graphics;
                    camera = graphics.camera();
                    initial_view = { initial_view: () => { console.log(`\ninitial_view`); } };
                    normalize_scale = { normalize_scale: () => { console.log(`\nnormalize_scale`); } };
                    normalize_zoom = { normalize_zoom: () => { console.log(`\nnormalize_zoom`); } };
                    normalize_pan_tilt = { normalize_pan_tilt: () => { console.log(`\nnormalize_pan_tilt`); } };
                    railsv = false; 
                    rails = { rails: false };
                    dollyX_ = { dollyX_: camera.position.x };
                    dollyY_ = { dollyY_: camera.position.y };
                    logscaleX_ = { logscaleX_: 0.0 };
                    logscaleY_ = { logscaleY_: 0.0 };
                    pan_ = { pan_: 0.0 }; 
                    tilt_ = { tilt_: 0.0 }; 
                    zoom_ = { zoom_: 90.0 }; 
                    symbolv = ['ETH', 'ETC', 'BTC', 'BCH', 'LTC', 'LBC', 'XRP', 'ZEC', 'BST', 'UJO'];
                    symbols = {
                        symbol: 'ETH',
                    };
                    layersv = false;
                    layers = { layers: layersv };
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
                    current_symbol = symbols['symbol'];
                    for (let s of symbolv) {
                        ohlc_options[s] = data_1.data.synthesize(s);
                    }
                    console.log(`%%% ui creating glyphs for layer 0`);
                    graphics.create('ohlc', 'ohlc0', 0, ohlc_options[current_symbol]);
                    console.log(`\n%%% ui layers[0] initialized for ${current_symbol} as:`);
                    console.dir(graphics.layer(0));
                    console.log(`setting layer_typev[0] = 'ohlc'`);
                    graphics.layer_type(0, 'ohlc');
                    layer_type[layername[0]]['layer_typev'] = 'ohlc';
                    gui.add(initial_view, 'initial_view').onFinishChange(() => {
                        camera.position.set(camera['initial_position'].x, camera['initial_position'].y, camera['initial_position'].z);
                        camera.lookAt(camera['initial_position'].x, camera['initial_position'].y, 0.0);
                        dollyX_['dollyX_'] = camera.position.x;
                        dollyY_['dollyY_'] = camera.position.y;
                        graphics.pan(0.0);
                        graphics.tilt(0.0);
                        graphics.zoom(90.0);
                        pan_['pan_'] = 0.0;
                        tilt_['tilt_'] = 0.0;
                        zoom_['zoom_'] = 90.0;
                    });
                    gui.add(normalize_scale, 'normalize_scale').onFinishChange(() => {
                        logscaleX_['logscaleX_'] = 1.0;
                        logscaleY_['logscaleY_'] = 1.0;
                        graphics.scaleActor('stage', 1.0, 1.0, 1.0);
                    });
                    gui.add(normalize_zoom, 'normalize_zoom').onFinishChange(() => {
                        zoom_['zoom_'] = 90.0;
                        graphics.zoom(90.0);
                    });
                    gui.add(normalize_pan_tilt, 'normalize_pan_tilt').onFinishChange(() => {
                        graphics.pan(0.0);
                        graphics.tilt(0.0);
                        pan_['pan_'] = 0.0;
                        tilt_['tilt_'] = 0.0;
                    });
                    gui.add(rails, 'rails').onFinishChange(() => {
                        railsv = !railsv;
                        console.log(`\nrails boolean value set to ${railsv}`);
                    });
                    gui.add(dollyX_, 'dollyX_', -5000, 50, 0.01).onChange(() => {
                        graphics.dollyX(dollyX_['dollyX_']);
                    }).listen();
                    gui.add(dollyY_, 'dollyY_', 0, 1000, 0.01).onChange(() => {
                        graphics.dollyY(dollyY_['dollyY_']);
                    }).listen();
                    gui.add(logscaleX_, 'logscaleX_', -2.0, 2.0, 0.01).onChange(() => {
                        let lsx = logscaleX_['logscaleX_'];
                        sx = Math.exp(lsx);
                        graphics.scaleActor('stage', sx, sy, 1.0);
                    }).listen();
                    gui.add(logscaleY_, 'logscaleY_', -2.0, 2.0, 0.01).onChange(() => {
                        let lsy = logscaleY_['logscaleY_'];
                        sy = Math.exp(lsy);
                        graphics.scaleActor('stage', sx, sy, 1.0);
                    }).listen();
                    gui.add(pan_, 'pan_', -1.57, 1.57, .01).onChange(() => {
                        graphics.pan(pan_['pan_']);
                    }).listen();
                    gui.add(tilt_, 'tilt_', -1.57, 1.57, .01).onChange(() => {
                        graphics.tilt(tilt_['tilt_']);
                    }).listen();
                    gui.add(zoom_, 'zoom_', 10, 170).onChange(() => {
                        graphics.zoom(zoom_['zoom_']);
                    }).listen();
                    gui.add(symbols, 'symbol', symbolv).onFinishChange(() => {
                        var filtered_children, layer, layer_length;
                        console.log(`\n\n%%% changing symbols!!!!`);
                        console.log(`current_symbol = ${current_symbol}`);
                        console.log(`current_layer = ${current_layer}`);
                        layer = graphics.layer(current_layer);
                        layer_length = layer.children.length;
                        console.log(`layer[${current_layer}].children.length = ${layer_length}`);
                        console.log(`removing ${current_symbol} children`);
                        filtered_children = layer.children.filter(child => !child.name.startsWith(current_symbol));
                        layer.children = filtered_children;
                        current_symbol = symbols['symbol'];
                        console.log(`\n%%% ui creating glyphs for ${current_symbol}`);
                        graphics.create('ohlc', `ohlc${current_layer}`, current_layer, ohlc_options[current_symbol]);
                        console.log(`setting layer_typev[${current_layer}] = 'ohlc'`);
                        graphics.layer_type(current_layer, 'ohlc');
                        layer_type[layername[current_layer]]['layer_typev'] = 'ohlc';
                        if (layersv === true) {
                            current_layer = (current_layer + 1) % config.stage.layers.length;
                            console.log(`after increment current_layer = ${current_layer}`);
                        }
                    });
                    gui.add(mod_present, 'mod_present').onFinishChange(() => {
                        console.log(`event: modify present glyph`);
                        console.log(`removing actor name = 'ETH0_past'`);
                        graphics.removeActor('ETH0_past');
                    });
                    gui.add(add_present, 'add_present').onFinishChange(() => {
                        console.log(`event: add to present array of glyphs`);
                    });
                    gui.add(add_past, 'add_past').onFinishChange(() => {
                        console.log(`event: add to past array of glyphs`);
                    });
                    gui.add(layers, 'layers').onFinishChange(() => {
                        layersv = !layersv;
                        if (layersv === false) {
                            current_layer = 0;
                        }
                        console.log(`\nlayers set to ${layersv} current_layer = ${current_layer}`);
                    });
                    for (let l = 0; l < layername.length; l++) {
                        gui.add(layer_type[layername[l]], 'layer_typev', layer_typev).onFinishChange(() => {
                            console.log(`setting layer_type[${l}] = ${layer_type[layername[l]]['layer_typev']}`);
                            graphics.layer_type(l, layer_type[layername[l]]['layer_typev']);
                        }).listen();
                    }
                } 
            }; 
            if (ui === undefined) {
                exports_1("ui", ui = new Ui());
            }
        }
    };
});

