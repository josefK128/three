// ui.ts - ui controller - singleton
// usage is by dependency injection or possibly by import:
// import {ui} from './controllers/ui';

// tmp - generate data-options for graphics.create(type, name, layer, options)
import {data} from '../services/data';


// closure vars
var ui:Ui,
    config:Config,
    graphics:any,
    camera:THREE.PerspectiveCamera,
    pivot:THREE.Object3D,

    // symbol options objects
    ohlc_options:object = {},
    current_symbol:string,

    // layer in which to insert new symbol glyphs based on ohlc_option[symbol]
    // (data-service synthesized) data
    current_layer:number = 0,
    
    // gui 
    initial_view:object,
    normalize_scale:object,
    normalize_zoom:object,
    normalize_pan_tilt:object,
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
    pitch_:object,
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


    // gui 
    initial_view = {initial_view:()=>{console.log(`\ninitial_view`);}};
    normalize_scale = {normalize_scale:()=>{console.log(`\nnormalize_scale`);}};
    normalize_zoom = {normalize_zoom:()=>{console.log(`\nnormalize_zoom`);}};
    normalize_pan_tilt = {normalize_pan_tilt:()=>{console.log(`\nnormalize_pan_tilt`);}};
    railsv = false;  // so initial rails=true
    rails = {rails: false};
    dollyX_ = { dollyX_: camera.position.x };
    dollyY_ = { dollyY_: camera.position.y };
    logscaleX_ = { logscaleX_: 0.0 };
    logscaleY_ = {logscaleY_: 0.0};
    pan_ = { pan_: 0.0 };  // radians
    tilt_ = { tilt_: 0.0 };  // radians
    zoom_ = { zoom_: 90.0 };  // degrees
    pitch_ = { pitch_: 0.0 };  // radians
    symbolv = ['ETH','ETC','BTC','BCH','LTC','LBC','XRP','ZEC','BST','UJO']; 
    symbols = {
      symbol: 'ETH',
    };
    layersv = false; 
    layers = {layers: layersv};
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


    // initialize currrent_symbol
    current_symbol = symbols['symbol'];

    // initialize symbol data-option objects for use as 'options' arg in 
    // graphics.create(ohlc/candle, name, layer, options)
    //
    // data.synthesize(first_dynamic_index:number=0, 
    //                 nglyphs:number=100, 
    //                 deltaX:number=5, 
    //                 meanO:number=60,
    //                 meanH:number=100,
    //                 meanL:number=20,
    //                 meanC:number=60):object 
    //
    for(let s of symbolv){
      ohlc_options[s] = data.synthesize(s);
    }

    // initialize layers[0]  
    console.log(`%%% ui creating glyphs for layer 0`);
    graphics.create('ohlc', 'ohlc0', 0, ohlc_options[current_symbol]);
    console.log(`\n%%% ui layers[0] initialized for ${current_symbol} as:`);
    console.dir(graphics.layer(0));
    //for(let child of graphics.layer(0).children){
    //  console.log(`layer0 contains Group actor ${child.name}`);
    //}
    // modify layer_typev for current_layer
    console.log(`setting layer_typev[0] = 'ohlc'`);
    graphics.layer_type(0, 'ohlc');
    layer_type[layername[0]]['layer_typev'] = 'ohlc';


    // build gui
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
        pivot.rotation.x = 0.0;
        pivot.rotation.y = 0.0;
        tilt_['tilt_'] = 0.0;
        pan_['pan_'] = 0.0;
    });


    gui.add(rails, 'rails').onFinishChange(() => {
        railsv = !railsv;
        console.log(`\nrails boolean value set to ${railsv}`);
    });


    // initially dollyX_ = camera.position.x
    gui.add(dollyX_, 'dollyX_', -50000, 50, 0.01).onChange(() => {
        graphics.dollyX(dollyX_['dollyX_']);
    }).listen();

    // initially dollyY_ = camera.position.y
    gui.add(dollyY_, 'dollyY_', 0, 1000, 0.01).onChange(() => {
        graphics.dollyY(dollyY_['dollyY_']);
    }).listen();


    // initially logscaleX_ = 0.0
    gui.add(logscaleX_, 'logscaleX_', -2.0 , 2.0, 0.01).onChange(() => {
        // logscale lsx -> scale sx
        let lsx = logscaleX_['logscaleX_'];

        // scale stage using stage.scale.set(sx ,sy, 1.0)
        sx = Math.exp(lsx);
        graphics.scaleActor('stage', sx, sy, 1.0);
    }).listen();

    // initially logscaleY_ = 0.0
    gui.add(logscaleY_, 'logscaleY_', -2.0, 2.0, 0.01).onChange(() => {
        // logscale lsy -> scale sy
        let lsy = logscaleY_['logscaleY_'];

        // scale stage using stage.scale.set(sx ,sy, 1.0)
        sy = Math.exp(lsy);
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

    // initially zoom_ = 90.0, range = [10, 170] degrees
    gui.add(zoom_, 'zoom_', 10, 170).onChange(() => {
        graphics.zoom(zoom_['zoom_']);
    }).listen();

    // initially pitch_ = 0.0, range = [-PI/2, PI/2] radians
    gui.add(pitch_, 'pitch_', -1.57, 1.57, .01).onChange(() => {
        if(pivot === undefined){
          pivot = new THREE.Object3D();
          pivot.position.x = camera.position.x;
          //pivot.position.y = camera.position.y;
          pivot.add(camera);
          graphics.scene().add(pivot);
        }
        pivot.rotation.x = pitch_['pitch_'];
    }).onFinishChange(() => {
        graphics.scene().remove(pivot);
        pivot.remove(camera);
        pivot = undefined;
    }).listen();


    //symbolv = ['ETH','ETC','BTC','BCH','LTC','LBC','XRP','ZEC','BST','UJO']; 
    //symbols = {
    //  symbol: 'ETH',
    //};
    gui.add(symbols, 'symbol', symbolv ).onFinishChange(() => {
        var filtered_children:any[],
            layer:THREE.Group, 
            layer_length:number;

        console.log(`\n\n%%% changing symbols!!!!`);
        console.log(`current_symbol = ${current_symbol}`);
        console.log(`current_layer = ${current_layer}`);

        layer = graphics.layer(current_layer);
        //console.log(`layer = `);
        //console.dir(layer);
        
        layer_length = layer.children.length;
        console.log(`layer[${current_layer}].children.length = ${layer_length}`);
        //console.log(`children = `);
        //console.dir(layer.children);

        console.log(`removing ${current_symbol} children`);
        filtered_children = layer.children.filter(child => !child.name.startsWith(current_symbol));
        //console.log(`filtered_children = `);
        //console.dir(filtered_children);
        layer.children = filtered_children;

        // remove actors <symbol><layer>_past and <symbol><layer_recent
        // NOTE: these arrays follow strict naming convention!
        graphics.removeActor(`${current_symbol}${current_layer}_past`);
        graphics.removeActor(`${current_symbol}${current_layer}_recent`);

        // update current_symbol
        current_symbol = symbols['symbol'];

        // graphics.create(type, name, layer, options)
        console.log(`\n%%% ui creating glyphs for ${current_symbol}`);
        graphics.create('ohlc', `ohlc${current_layer}`, current_layer, ohlc_options[current_symbol]);

        // modify layer_typev for current_layer
        console.log(`setting layer_typev[${current_layer}] = 'ohlc'`);
        graphics.layer_type(current_layer, 'ohlc');
        layer_type[layername[current_layer]]['layer_typev'] = 'ohlc';

        // if layersv===true advance current_layers 
        if(layersv === true){
          current_layer = (current_layer+1)%config.stage.layers.length;
          console.log(`after increment current_layer = ${current_layer}`);
        }
    });


    gui.add(mod_present, 'mod_present').onFinishChange(() => {
        console.log(`event: modify present glyph`);

        // modify layer_typev for current_layer
        console.log(`removing actor name = 'ETH0_past'`);
        graphics.removeActor('ETH0_past');
    });

    gui.add(add_present, 'add_present').onFinishChange(() => {
        console.log(`event: add to present array of glyphs`);
    });

    gui.add(add_past, 'add_past').onFinishChange(() => {
        console.log(`event: add to past array of glyphs`);
    });


    // DISABLE - NOT USEFUL
    // layers=true => load symbol data in successive layers (circularly)
    // layers=false => load symbol data into level[0] and overwrite
    // layers=false => reset current_layer=0
    gui.add(layers, 'layers').onFinishChange(() => {
      layersv = !layersv;
      if(layersv === false){
      current_layer = 0;      // set layers=f => load all glyph sets at layer0
      }else{
        current_layer = 1;  // set layers=t => load next glyph set at layer1
      }
      console.log(`\nlayers set to ${layersv} current_layer = ${current_layer}`);
    });


    // show/hide layers and display layer_type
    for(let l=0; l<layername.length; l++){
      gui.add(layer_type[layername[l]], 'layer_typev', layer_typev).onFinishChange(() => {
        console.log(`setting layer_type[${l}] = ${layer_type[layername[l]]['layer_typev']}`);
        graphics.layer_type(l, layer_type[layername[l]]['layer_typev']);
      }).listen();
    }

  }//init

}//Ui



// enforce singleton export
if(ui === undefined){
  ui = new Ui();
}

export {ui};
