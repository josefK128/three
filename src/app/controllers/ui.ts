// ui.ts - ui controller - singleton
// usage is by dependency injection or possibly by import:
// import {ui} from './controllers/ui';


// closure vars
var ui:Ui,
    config:Config,
    graphics:any,
    camera:THREE.PerspectiveCamera,
    controls:any,

    // gui 
    initial_view:object,
    normalize_scale:object,
    railsv:boolean, 
    rails:object,
    dollyX_:object,
    dollyY_:object,
    logscaleX_:object,
    logscaleY_:object,
    sx:number = 1.0,
    sy:number = 1.0,
    pan_:object,
    tilt_:object,
    zoom_:object,
    symbolv:string[],
    symbols:object,
    layersv:boolean,
    layers:object,
    layername:string[] = [],
    layer_typev:string[] = [],
    layer_type:object = {},
    mod_present:object,
    add_present:object,
    add_past:object,
    gui:dat.GUI,

    // to stop propagation from gui of specified events
    stop: (e:Event) => void,    
    events:string[]; 


class Ui {

  // init scene, camera, renderer  etc.
  init(_graphics:Graphics, _config:Config = {}):void {
    config = _config;
    graphics = _graphics;
    camera = graphics.camera();
    controls = camera['controls'];

    // gui 
    initial_view = {initial_view:()=>{console.log(`\ninitial_view`);}};
    normalize_scale = {normalize_scale:()=>{console.log(`\nnormalize_scale`);}};
    railsv = false;  // so initial rails=true
    rails = {rails: false};
    dollyX_ = { dollyX_: -100.0 };
    dollyY_ = { dollyY_: 80.0 };
    logscaleX_ = { logscaleX_: 0.0 };
    logscaleY_ = {logscaleY_: 0.0};
    pan_ = { pan_: 0.0 };  // radians
    tilt_ = { tilt_: 0.0 };  // radians
    zoom_ = { zoom_: 90.0 };  // degrees
    symbolv = ['ETH','ETC','BTC','BCH','LTC','LBC','XRP','ZEC','BST','UJO']; 
    symbols = {
      symbol: 'ETH',
    };
    layersv = true;  // so initial layers=false
    layers = {layers: true};
    layer_typev = ["invisible", "ohlc", "candle", "line", "mountain"];
    for(let l=0;  l<config.stage.layer_type.length; l++){
      layername[l] = `layer_type${l}`;
      layer_type[layername[l]] = {layer_typev: config.stage.layer_type[l]};
    }

    mod_present = { mod_present:()=>{console.log(`\nmod_present`);}};
    add_present = { add_present:()=>{console.log(`\nadd_present`);}};
    add_past = { add_past:()=>{console.log(`\nadd_past`);}};
    gui = new dat.GUI();

    // to stop propagation from gui of specified events
    stop = (e) => {
      //console.log(`stop propagation of event ${e.type}`);
      e.stopPropagation();
    };
    //events = ["click", "contextmenu", "dblclick", "mousedown", "mouseenter", 
    //"mouseleave", "mousemove", "mouseover", "mouseout", "mouseup", "keydown",
    //"keypress", "keyup", "blur", "change", "focus", "focusin", "focusout", 
    //"input", "invalid", "reset", "search", "select", "submit", "drag", 
    //"dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", 
    //"copy", "cut", "paste", "mousewheel", "wheel", "touchcancel", "touchend",
    //"touchmove", "touchstart"];
    events = ["mousedown"];


    // prevent events propagation through gui.domElement
    console.log(`\n gui.domElement = `);
    console.dir(gui.domElement);
    for(let e of events){
      gui.domElement.addEventListener(e, stop, false);
    }



    // build gui
    gui.add(initial_view, 'initial_view').onFinishChange(() => {
        console.log(`revert to initial_view`);
        console.log(`initial_position.x = ${camera['initial_position'].x}`);
        console.log(`initial_position.y = ${camera['initial_position'].y}`);
        console.log(`initial_position.z = ${camera['initial_position'].z}`);
        camera.position.set(camera['initial_position'].x, camera['initial_position'].y, camera['initial_position'].z);
        controls.update();
        controls.target.set(camera['initial_position'].x, camera['initial_position'].y, 0.0);
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


    gui.add(rails, 'rails').onFinishChange(() => {
        railsv = !railsv;
        console.log(`\nrails boolean value set to ${railsv}`);
    });


    // initially dollyX_ = camera.position.x
    gui.add(dollyX_, 'dollyX_', -5000, 50, 1).onChange(() => {
        graphics.dollyX(dollyX_['dollyX_']);
    }).listen();

    // initially dollyY_ = camera.position.y
    gui.add(dollyY_, 'dollyY_', 0, 1000, 1).onChange(() => {
        graphics.dollyY(dollyY_['dollyY_']);
    }).listen();


    // initially logscaleX_ = 0.0
    gui.add(logscaleX_, 'logscaleX_', -2.0 , 2.0, 0.01).onChange(() => {
        // logscale lsx -> scale sx
        let lsx = logscaleX_['logscaleX_'];

        // scale stage using stage.scale.set(sx ,sy, 1.0)
        sx = Math.exp(lsx);
        //console.log(`current logscaleX_ lsx = ${lsx} sx = ${sx}`);
        graphics.scaleActor('stage', sx, sy, 1.0);
    }).listen();

    // initially logscaleY_ = 0.0
    gui.add(logscaleY_, 'logscaleY_', -2.0, 2.0, 0.01).onChange(() => {
        // logscale lsy -> scale sy
        let lsy = logscaleY_['logscaleY_'];

        // scale stage using stage.scale.set(sx ,sy, 1.0)
        sy = Math.exp(lsy);
        console.log(`current logscaleY_ lsy = ${lsy} sy = ${sy}`);
        graphics.scaleActor('stage', sx, sy, 1.0);
    }).listen();


    // initially pan_ = 0.0, range = [-PI/2, PI/2] radians
    gui.add(pan_, 'pan_', -1.57, 1.57, .01).onChange(() => {
        graphics.pan(pan_['pan_']);
    }).listen();

    // initially tilt_ = 0.0, range = [-PI/2, PI/2] radians
    gui.add(tilt_, 'tilt_', -1.57, 1.57, .01).onChange(() => {
      graphics.tilt(tilt_['tilt_']);
    }).listen();

    // initially zoom_ = 90.0, range = [30, 150] degrees
    gui.add(zoom_, 'zoom_', 10, 170).onChange(() => {
        graphics.zoom(zoom_['zoom_']);
    }).listen();


    //symbolv = ['ETH','ETC','BTC','BCH','LTC','LBC','XRP','ZEC','BST','UJO']; 
    //symbols = {
    //  symbol: 'ETH',
    //};
    gui.add(symbols, 'symbol', symbolv ).onFinishChange(() => {
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


    // layers=true => load symbol data in successive layers (circularly)
    // layers=false => load symbol data into level[0] and overwrite
    gui.add(layers, 'layers').onFinishChange(() => {
        layersv = !layersv;
        console.log(`\nlayers boolean value set to ${layersv}`);
    });

    // show/hide layers
    for(let l=0; l<layername.length; l++){
      gui.add(layer_type[layername[l]], 'layer_typev', layer_typev).onFinishChange(() => {
        console.log(`setting layer_type[${l}] = ${layer_type[layername[l]]['layer_typev']}`);
        graphics.layer_type(l, layer_type[layername[l]]['layer_typev']);
      });
    }

  }//init

}//Ui



// enforce singleton export
if(ui === undefined){
  ui = new Ui();
}

export {ui};
