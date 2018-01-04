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
    zoomX_:object,
    zoomY_:object,
    symbolv:string[],
    symbols:object,
    layersv:boolean,
    layers:object,
    layername:string[] = [],
    show_layer:object = {},
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
    dollyX_ = { dollyX_: -10.0 };
    zoomX_ = { zoomX_: -10.0 };
    zoomY_ = {zoomY_: -20};
    symbolv = ['ETH','ETC','BTC','BCH','LTC','LBC','XRP','ZEC','BST','UJO']; 
    symbols = {
      symbol: 'ETH',
    };
    layersv = true;  // so initial layers=false
    layers = {layers: true};
    for(let l=0;  l<config.stage.show_layer.length; l++){
      layername[l] = `show_layer_${l}`;
      show_layer[layername[l]] = config.stage.show_layer[l];
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

    gui.add(dollyX_, 'dollyX_', -190, -10).onChange(() => {
        console.log(`current dollyX_ value = = ${dollyX_['dollyX_']}`);
    });

    gui.add(zoomX_, 'zoomX_', -200, -20).onChange(() => {
        console.log(`current zoomX_ value = = ${zoomX_['zoomX_']}`);
    });

    gui.add(zoomY_, 'zoomY_',-200, -20).onChange(() => {
        console.log(`current zoomY_ value = = ${zoomY_['zoomY_']}`);
    });

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


    gui.add(layers, 'layers').onFinishChange(() => {
        layersv = !layersv;
        console.log(`\nlayers boolean value set to ${layersv}`);
    });

    // show/hide layers
    for(let l=0; l<layername.length; l++){
      gui.add(show_layer, layername[l]).onFinishChange(() => {
        config.stage.show_layer[l] = !config.stage.show_layer[l];
        if(config.stage.show_layer[l]){
          graphics.showLayer(l);
        }else{
          graphics.hideLayer(l);
        }
      });
    }

  }//init

}//Ui



// enforce singleton export
if(ui === undefined){
  ui = new Ui();
}

export {ui};
