// ui.ts - ui controller - singleton
// usage is by dependency injection or possibly by import:
// import {ui} from './controllers/ui';


// closure vars
var ui:Ui,
    graphics:any,

    // gui 
    initial_view:object,
    flatten_view:object,
    railsv:boolean, 
    rails:object,
    dollyX_:object,
    logscaleX_:object,
    logscaleY_:object,
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
  init(_graphics:Graphics, config:Config = {}):void {
    graphics = _graphics;

    // gui 
    initial_view = {initial_view:()=>{console.log(`\ninitial_view`);}};
    flatten_view = { flatten_view:()=>{console.log(`\nflatten_view`);}};
    railsv = false;  // so initial rails=true
    rails = {rails: false};
    dollyX_ = { dollyX_: -50.0 };
    logscaleX_ = { logscaleX_: 0.0 };
    logscaleY_ = {logscaleY_: 0.0};
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
    });

    gui.add(flatten_view, 'flatten_view').onFinishChange(() => {
        console.log(`flatten the view to 2D orthogonal to camera.lookAt ray`);
    });

    gui.add(rails, 'rails').onFinishChange(() => {
        railsv = !railsv;
        console.log(`\nrails boolean value set to ${railsv}`);
    });


    // initially dollyX_ = 0.0; camera.position.x=-50 camera.lookAt.x=-50
    gui.add(dollyX_, 'dollyX_', -5000, 50, 1).onChange(() => {
        console.log(`current dollyX_ value = = ${dollyX_['dollyX_']}`);
    });

    // initially logscaleX_ = 0.0
    gui.add(logscaleX_, 'logscaleX_', -1.0 , 1.0, 0.01).onChange(() => {
        console.log(`current logscaleX_ value = = ${logscaleX_['logscaleX_']}`);
    });

    // initially logscaleY_ = 0.0
    gui.add(logscaleY_, 'logscaleY_', -1.0, 1.0, 0.01).onChange(() => {
        console.log(`current logscaleY_ value = = ${logscaleY_['logscaleY_']}`);
    });


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
