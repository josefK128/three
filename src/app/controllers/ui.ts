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
    // pivot is a temporary Object3D on the x-axis with child camera
    // Then 'pitch' rotations around x-axis will move the camera in a 
    // semi-circle around the x-axis and clearly show layers in 3D perspective
    pivot:THREE.Object3D,

    // symbol options objects
    // ohlc_options:object = {first_dynamic_index:number = 0,
    //                        xpositions:number[N],
    //                        data:number[4*N]}
    ohlc_options:object = {},
    current_symbol:string,

    // deltaX - distance between xpositions
    deltaX:number,

    // temporary hard-coded mock data!!
    // mock data for add_recent, add_past, modify_recent
    // NOTE: xpositions must be increasing seq! (neg-to-pos)(past-to-future)
    mock_data:number[] = [300, 320, 60, 80, 260, 280, 100, 220],
    //mock_data:number[] = [300, 320, 60, 80],
    mock_recent_xpositions:number[] = [-5, 0],
    //mock_recent_xpositions:number[] = [0],
    mock_past_xpositions:number[] = [-50005,-50000], 
    //mock_past_xpositions:number[] = [-50000], 
    mock_mod_data:number[] = [300, 320, 60, 80],
    mock_mod_xpositions:number[] = [0],


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

    // deltaX - distance between xpositions
    deltaX = config.stage.deltaX;

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
    layer_typev = ["none", "invisible", "ohlc", "candle", "lineOp", "lineH", "lineL","lineC", "mountainOp", "mountainH", "mountainL", "mountainC", "study"];
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


    // initialize current_symbol
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



    // **********
    // initialize layers (other than initial config of grid and axes)
    // **********

    // initialize layers[0] to candle (graphics.create('candle',...)   
    // and modify layer_typev for current_layer
    console.log(`setting layer_typev[0] = 'candle'`);
    // create layer[0]
    //graphics.layer_type(0, 'ohlc', ohlc_options[current_symbol]);
    graphics.layer_type(0, 'candle', ohlc_options[current_symbol]);
    // UI
    //layer_type[layername[0]]['layer_typev'] = 'ohlc';
    layer_type[layername[0]]['layer_typev'] = 'candle';
    console.log(`\n%%% ui layers[0] initialized for ${current_symbol} as:`);
    console.dir(graphics.layer(0));


    // initialize layers[1] to lineC (graphics.create('line',...)  
    // and modify layer_typev for current_layer
    console.log(`setting layer_typev[1] = 'lineC'`);
    // create layer[1]
    graphics.layer_type(1, 'line', ohlc_options[current_symbol]);
    // UI
    layer_type[layername[1]]['layer_typev'] = 'lineC';
    console.log(`\n%%% ui layers[1] initialized for ${current_symbol} as:`);
    console.dir(graphics.layer(1));


    // initialize layers[2] to Sprite (graphics.create('sprite',...) 
    // create layer[2]
    console.log(`\n\n initializing layer[2] with sprite w default options`);
    for(let i=1; i<10; i++){
      graphics.create('sprite', 'sprite2', 2, {
        glyph:i.toString(), x:-10*i, y:120.0 + Math.random()*10, z:0.0, sx:10, sy:20 });  
    }
    // UI
    layer_type[layername[2]]['layer_typev'] = 'study';






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
        tilt_['tilt_'] = 0.0;
        pan_['pan_'] = 0.0;
        graphics.pan(0.0);
        graphics.tilt(0.0);
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
    gui.add(pan_, 'pan_', -0.4, 0.4, .01).onChange(() => {
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
        var options = {},
            l = current_layer;

        // modify ohlc_options['data']
        for(let i=0; i<mock_mod_xpositions.length; i++){
          let j = -mock_mod_xpositions[i]/deltaX;
          console.log(`j = ${j}`);
          for(let k=j; k<j+4; k++){
            console.log(`initially ohlc_options[current_symbol]['data'][${k}] = ${ohlc_options[current_symbol]['data'][k]}`);
            ohlc_options[current_symbol]['data'][k] = mock_mod_data[k];
            console.log(`after update ohlc_options[current_symbol]['data'][${k}] = ${ohlc_options[current_symbol]['data'][k]}`);
          }
        }

        // modify graphics
        console.log(`event: modify present glyph`);
        options['xpositions'] = [];
        for(let p of mock_mod_xpositions){
          options['xpositions'].push(p);
        }
        options['data'] = mock_mod_data;
        graphics.mod_recent(current_symbol, l, layer_type[layername[l]]['layer_typev'], options);
    });

    gui.add(add_present, 'add_present').onFinishChange(() => {
       var options = {},
           l = current_layer,
           mrxp = mock_recent_xpositions,
           md = mock_data,
           lxp = mock_recent_xpositions.length,
           offset = lxp*deltaX;

        // modify ohlc_options['xpositions'] and ohlc_options['data']
        // xpositions
        for(let i=0; i<lxp; i++){
//          //console.log(`i = ${i}`);
          ohlc_options[current_symbol]['xpositions'].unshift(mrxp[i] + offset);
          console.log(`### ${ohlc_options[current_symbol]['xpositions'][0]}`);
        }

        // data
        console.log(`ohlc_op[c_s][d].length = ${ohlc_options[current_symbol]['data'].length}`);
        for(let i=0; i<lxp; i++){
          for(let j=(i+1)*4-1; j>=i*4; j--){
            if(j%4 === 0){
              console.log(`open`);
            }
            if(j%4 === 1){
              console.log(`high`);
            }
            if(j%4 === 2){
              console.log(`low`);
            }
            if(j%4 === 3){
              console.log(`close`);
            }
            console.log(`unshift md[${j}] = ${md[j]}`);
            ohlc_options[current_symbol]['data'].unshift(md[j]);
          }
        }
        let length = ohlc_options[current_symbol]['data'].length;
        for(let i=0; i<8; i++){
          console.log(`data[${i}] = ${ohlc_options[current_symbol]['data'][i]}`);
        }
        console.log(`ohlc_op[c_s][d].length = ${ohlc_options[current_symbol]['data'].length}`);


        // modify graphics
        console.log(`event: add to present array of glyphs`);
        options['xpositions'] = [];
        console.log(`gui add_present empty options:`);
        console.dir(options);
        for(let p of mock_recent_xpositions){
          options['xpositions'].push(p);
        }
        options['data'] = mock_data;

        graphics.add_recent(current_symbol, l, layer_type[layername[l]]['layer_typev'], options);
    });

    gui.add(add_past, 'add_past').onFinishChange(() => {
        var options = {},
            l = current_layer,
            mpxp:number[] = mock_past_xpositions,
            md:number[] = mock_data;

        // modify ohlc_options['xpositions'] and ohlc_options['data']
        for(let i=0; i<mpxp.length; i++){
          ohlc_options[current_symbol]['xpositions'].push(mpxp[mpxp.length-1-i]);
          let m = ohlc_options[current_symbol]['data'].length;  
          for(let k=0; k<4; k++){
            ohlc_options[current_symbol]['data'].push(md[4*(mpxp.length-1-i) + k]);
          }
        }

        // modify graphics
        console.log(`event: add to past array of glyphs`);
        options['xpositions'] = [];
        for(let p of mock_past_xpositions){
          options['xpositions'].push(p);
        }
        options['data'] = mock_data;
        console.log(`gui add_past data, xpositions options:`);
        console.dir(options);

        graphics.add_past(current_symbol, l, layer_type[layername[l]]['layer_typev'], options);
        });



    // DISABLE - NOT USEFUL
    // layers=true => load symbol data in successive layers (circularly)
    // layers=false => load symbol data into level[0] and overwrite
    // layers=false => reset current_layer=0
    gui.add(layers, 'layers').onFinishChange(() => {
      layersv = !layersv;
      if(layersv === false){
        current_layer = 0;    // set layers=f => load all glyph sets at layer0
      }else{
        current_layer = 1;  // set layers=t => load next glyph set at layer1
      }
      console.log(`\nlayers set to ${layersv} current_layer = ${current_layer}`);
    });


    // show/hide layers and display layer_type
    for(let l=0; l<layername.length; l++){
      gui.add(layer_type[layername[l]], 'layer_typev', layer_typev).onFinishChange(() => {
        let ltype = layer_type[layername[l]]['layer_typev'];
        if(ltype.endsWith('Op')){
          ohlc_options[current_symbol]['subset'] = 'Op';
        }
        if(ltype.endsWith('H')){
          ohlc_options[current_symbol]['subset'] = 'H';
        }
        if(ltype.endsWith('L')){
          ohlc_options[current_symbol]['subset'] = 'L';
        }
        if(ltype.endsWith('C')){
          ohlc_options[current_symbol]['subset'] = 'C';
        }
        //TBD - expand for studies?

        // set ltype to 'stem' of ltype - i.e. remove leaf Op|H|L|C
        if(ltype.startsWith('line')){
          ltype = 'line';
        }
        if(ltype.startsWith('mountain')){
          ltype = 'mountain';
        }
        if(ltype.startsWith('study')){
          ltype = 'study';
        }

        console.log(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);
        console.log(`xpositions.l = ${ohlc_options[current_symbol]['xpositions'].length}`);
//        for(let i=0; i<ohlc_options[current_symbol]['xpositions']; i++){
//          console.log(`xpositions[${i}] = ohlc_options[current_symbol]['xpositions'][i]`);
//        }
        graphics.layer_type(l, ltype, ohlc_options[current_symbol]);
      }).listen();
    }

  }//init

}//Ui



// enforce singleton export
if(ui === undefined){
  ui = new Ui();
}

export {ui};
