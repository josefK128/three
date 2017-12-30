// ui.ts - ui controller - singleton
// usage is by dependency injection or possibly by import:
// import {ui} from './controllers/ui';


// closure vars
var ui:Ui,
    graphics:Graphics,

    // gui 
    initial_view:object,
    flatten_view:object,
    railsv:boolean, 
    rails:object,
    dollyX_:object,
    zoomX_:object,
    scaleX_:object,
    symbolv:string[],
    symbols:object,
    layersv:boolean,
    layers:object,
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
    initial_view = {initial_view:()=>{console.log(`initial_view`);}};
    flatten_view = { flatten_view:()=>{console.log(`flatten_view`);}};
    railsv = false;  // so initial rails=true
    rails = {rails: railsv=!railsv};
    dollyX_ = { dollyX_: -10.0 };
    zoomX_ = { zoomX_: -10.0 };
    scaleX_ = {scaleX_: -20};
    symbolv = ['ETH', 'BTC', 'LTC', 'LBC', 'BST', 'UJO']; 
    symbols = {
      symbol: 'ETH',
    };
    layersv = true;  // so initial layers=false
    layers = {layers: layersv=!layersv};
    mod_present = { mod_present:()=>{console.log(`mod_present`);}};
    add_present = { add_present:()=>{console.log(`add_present`);}};
    add_past = { add_past:()=>{console.log(`add_past`);}};
    gui = new dat.GUI();

    // to stop propagation from gui of specified events
    stop = (e) => {
      console.log(`stop propagation of event ${e.type}`);
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
    gui.add(initial_view, 'initial_view');
    gui.add(flatten_view, 'flatten_view');
    gui.add(rails, 'rails');
    gui.add(dollyX_, 'dollyX_', -190, -10);
    gui.add(zoomX_, 'zoomX_', -200, -20);
    gui.add(scaleX_, 'scaleX_');
    gui.add(symbols, 'symbol', symbolv ).onFinishChange(() => {
        console.log(`current symbol = ${symbols['symbol']}`);
    });
    gui.add(layers, 'layers');
    gui.add(mod_present, 'mod_present');
    gui.add(add_present, 'add_present');
    gui.add(add_past, 'add_past');
  }//init

}//Ui



// enforce singleton export
if(ui === undefined){
  ui = new Ui();
}

export {ui};
