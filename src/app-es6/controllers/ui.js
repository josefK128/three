System.register(["../services/data"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var data_1, ui, config, graphics, camera, pivot, ohlc_options, current_symbol, deltaX, mock_data, mock_recent_xpositions, mock_past_xpositions, mock_mod_data, mock_mod_xpositions, current_layer, initial_view, normalize_scale, normalize_zoom, normalize_pan_tilt, railsv, rails, dollyX_, dollyY_, logscaleX_, logscaleY_, sx, sy, pan_, tilt_, zoom_, pitch_, symbolv, symbols, layersv, layers, layername, layer_typev, layer_type, mod_present, add_present, add_past, gui, stop, events, Ui;
    return {
        setters: [
            function (data_1_1) {
                data_1 = data_1_1;
            }
        ],
        execute: function () {
            ohlc_options = {}, 
            mock_data = [300, 320, 60, 80, 260, 280, 100, 220], 
            mock_recent_xpositions = [-5, 0], 
            mock_past_xpositions = [-50005, -50000], 
            mock_mod_data = [300, 320, 60, 80], mock_mod_xpositions = [0], 
            current_layer = 0, sx = 1.0, sy = 1.0, layername = [], layer_typev = [], layer_type = {};
            Ui = class Ui {
                init(_graphics, _config = {}) {
                    config = _config;
                    graphics = _graphics;
                    camera = graphics.camera();
                    deltaX = config.stage.deltaX;
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
                    pitch_ = { pitch_: 0.0 }; 
                    symbolv = ['ETH', 'ETC', 'BTC', 'BCH', 'LTC', 'LBC', 'XRP', 'ZEC', 'BST', 'UJO'];
                    symbols = {
                        symbol: 'ETH',
                    };
                    layersv = false;
                    layers = { layers: layersv };
                    layer_typev = ["none", "invisible", "ohlc", "candle", "lineOp", "lineH", "lineL", "lineC", "mountainOp", "mountainH", "mountainL", "mountainC", "study"];
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
                    console.log(`setting layer_typev[0] = 'candle'`);
                    graphics.layer_type(0, 'candle', ohlc_options[current_symbol]);
                    layer_type[layername[0]]['layer_typev'] = 'candle';
                    console.log(`\n%%% ui layers[0] initialized for ${current_symbol} as:`);
                    console.dir(graphics.layer(0));
                    console.log(`setting layer_typev[1] = 'lineC'`);
                    graphics.layer_type(1, 'line', ohlc_options[current_symbol]);
                    layer_type[layername[1]]['layer_typev'] = 'lineC';
                    console.log(`\n%%% ui layers[1] initialized for ${current_symbol} as:`);
                    console.dir(graphics.layer(1));
                    console.log(`\n\n initializing layer[2] with sprite w default options`);
                    graphics.create('sprite', 'sprite2', 2);
                    layer_type[layername[2]]['layer_typev'] = 'study';
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
                        tilt_['tilt_'] = 0.0;
                        pan_['pan_'] = 0.0;
                        graphics.pan(0.0);
                        graphics.tilt(0.0);
                    });
                    gui.add(rails, 'rails').onFinishChange(() => {
                        railsv = !railsv;
                        console.log(`\nrails boolean value set to ${railsv}`);
                    });
                    gui.add(dollyX_, 'dollyX_', -50000, 50, 0.01).onChange(() => {
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
                    gui.add(pan_, 'pan_', -0.4, 0.4, .01).onChange(() => {
                        graphics.pan(pan_['pan_']);
                    }).listen();
                    gui.add(tilt_, 'tilt_', -1.57, 1.57, .01).onChange(() => {
                        graphics.tilt(tilt_['tilt_']);
                    }).listen();
                    gui.add(zoom_, 'zoom_', 10, 170).onChange(() => {
                        graphics.zoom(zoom_['zoom_']);
                    }).listen();
                    gui.add(pitch_, 'pitch_', -1.57, 1.57, .01).onChange(() => {
                        if (pivot === undefined) {
                            pivot = new THREE.Object3D();
                            pivot.add(camera);
                            graphics.scene().add(pivot);
                        }
                        pivot.rotation.x = pitch_['pitch_'];
                    }).onFinishChange(() => {
                        pivot.rotation.x = 0.0;
                        pitch_['pitch_'] = 0.0;
                        graphics.scene().remove(pivot);
                        pivot.remove(camera);
                        pivot = undefined;
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
                        graphics.removeActor(`${current_symbol}${current_layer}_past`);
                        graphics.removeActor(`${current_symbol}${current_layer}_recent`);
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
                        var options = {}, l = current_layer;
                        for (let i = 0; i < mock_mod_xpositions.length; i++) {
                            let j = -mock_mod_xpositions[i] / deltaX;
                            console.log(`j = ${j}`);
                            for (let k = j; k < j + 4; k++) {
                                console.log(`initially ohlc_options[current_symbol]['data'][${k}] = ${ohlc_options[current_symbol]['data'][k]}`);
                                ohlc_options[current_symbol]['data'][k] = mock_mod_data[k];
                                console.log(`after update ohlc_options[current_symbol]['data'][${k}] = ${ohlc_options[current_symbol]['data'][k]}`);
                            }
                        }
                        console.log(`event: modify present glyph`);
                        options['xpositions'] = [];
                        for (let p of mock_mod_xpositions) {
                            options['xpositions'].push(p);
                        }
                        options['data'] = mock_mod_data;
                        graphics.mod_recent(current_symbol, l, layer_type[layername[l]]['layer_typev'], options);
                    });
                    gui.add(add_present, 'add_present').onFinishChange(() => {
                        var options = {}, l = current_layer, mrxp = mock_recent_xpositions, md = mock_data, lxp = mock_recent_xpositions.length, offset = lxp * deltaX;
                        for (let i = 0; i < lxp; i++) {
                            ohlc_options[current_symbol]['xpositions'].unshift(mrxp[i] + offset);
                            console.log(`### ${ohlc_options[current_symbol]['xpositions'][0]}`);
                        }
                        console.log(`ohlc_op[c_s][d].length = ${ohlc_options[current_symbol]['data'].length}`);
                        for (let i = 0; i < lxp; i++) {
                            for (let j = (i + 1) * 4 - 1; j >= i * 4; j--) {
                                if (j % 4 === 0) {
                                    console.log(`open`);
                                }
                                if (j % 4 === 1) {
                                    console.log(`high`);
                                }
                                if (j % 4 === 2) {
                                    console.log(`low`);
                                }
                                if (j % 4 === 3) {
                                    console.log(`close`);
                                }
                                console.log(`unshift md[${j}] = ${md[j]}`);
                                ohlc_options[current_symbol]['data'].unshift(md[j]);
                            }
                        }
                        let length = ohlc_options[current_symbol]['data'].length;
                        for (let i = 0; i < 8; i++) {
                            console.log(`data[${i}] = ${ohlc_options[current_symbol]['data'][i]}`);
                        }
                        console.log(`ohlc_op[c_s][d].length = ${ohlc_options[current_symbol]['data'].length}`);
                        console.log(`event: add to present array of glyphs`);
                        options['xpositions'] = [];
                        console.log(`gui add_present empty options:`);
                        console.dir(options);
                        for (let p of mock_recent_xpositions) {
                            options['xpositions'].push(p);
                        }
                        options['data'] = mock_data;
                        graphics.add_recent(current_symbol, l, layer_type[layername[l]]['layer_typev'], options);
                    });
                    gui.add(add_past, 'add_past').onFinishChange(() => {
                        var options = {}, l = current_layer, mpxp = mock_past_xpositions, md = mock_data;
                        for (let i = 0; i < mpxp.length; i++) {
                            ohlc_options[current_symbol]['xpositions'].push(mpxp[mpxp.length - 1 - i]);
                            let m = ohlc_options[current_symbol]['data'].length;
                            for (let k = 0; k < 4; k++) {
                                ohlc_options[current_symbol]['data'].push(md[4 * (mpxp.length - 1 - i) + k]);
                            }
                        }
                        console.log(`event: add to past array of glyphs`);
                        options['xpositions'] = [];
                        for (let p of mock_past_xpositions) {
                            options['xpositions'].push(p);
                        }
                        options['data'] = mock_data;
                        console.log(`gui add_past data, xpositions options:`);
                        console.dir(options);
                        graphics.add_past(current_symbol, l, layer_type[layername[l]]['layer_typev'], options);
                    });
                    gui.add(layers, 'layers').onFinishChange(() => {
                        layersv = !layersv;
                        if (layersv === false) {
                            current_layer = 0; 
                        }
                        else {
                            current_layer = 1; 
                        }
                        console.log(`\nlayers set to ${layersv} current_layer = ${current_layer}`);
                    });
                    for (let l = 0; l < layername.length; l++) {
                        gui.add(layer_type[layername[l]], 'layer_typev', layer_typev).onFinishChange(() => {
                            let ltype = layer_type[layername[l]]['layer_typev'];
                            if (ltype.endsWith('Op')) {
                                ohlc_options[current_symbol]['subset'] = 'Op';
                            }
                            if (ltype.endsWith('H')) {
                                ohlc_options[current_symbol]['subset'] = 'H';
                            }
                            if (ltype.endsWith('L')) {
                                ohlc_options[current_symbol]['subset'] = 'L';
                            }
                            if (ltype.endsWith('C')) {
                                ohlc_options[current_symbol]['subset'] = 'C';
                            }
                            if (ltype.startsWith('line')) {
                                ltype = 'line';
                            }
                            if (ltype.startsWith('mountain')) {
                                ltype = 'mountain';
                            }
                            if (ltype.startsWith('study')) {
                                ltype = 'study';
                            }
                            console.log(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);
                            console.log(`xpositions.l = ${ohlc_options[current_symbol]['xpositions'].length}`);
                            graphics.layer_type(l, ltype, ohlc_options[current_symbol]);
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

