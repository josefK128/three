// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';

import {Grid} from '../actors/grid';
import {Axes} from '../actors/axes';
import {Ohlc} from '../actors/ohlc';
import {Candle} from '../actors/candle';
import {Line} from '../actors/line';
import {Mountain} from '../actors/mountain';
import {Study} from '../actors/study';
import {Sprite} from '../actors/sprite';
import {Quad} from '../actors/quad';
import {Quad_shm} from '../actors/quad_shm';


// closure vars
var graphics:Graphics,
    config:Config,
    gl:any,
    renderer:THREE.WebGLRenderer,
    stats:Stats,
    clock:THREE.Clock = new THREE.Clock(),
    grid:THREE.Object3D,
    axes:THREE.Object3D,
    et:number = 0,  // elapsedTime from clock  
    count:number = 0,

    camera:THREE.PerspectiveCamera,
    lookAt:any,
    light:THREE.PointLight = new THREE.PointLight(),

    scene:THREE.Scene,
    stage:THREE.Group,
    layers:THREE.Group[] = [],
    nLayers:number, 
    layerDelta:number,
    layersGlobal2Local:number,
    deltaX:number,
    actors:object = {},

    onWindowResize = () => {
      let w = window.innerWidth,
          h = window.innerHeight;
          
      //console.log(`onWindowResize w=${w} h=${h}`);
      camera.aspect = w/h;
      camera.updateProjectionMatrix();
      renderer.setSize(w,h);
    };



class Graphics {

  // init scene, camera, renderer  etc.
  init(_config:Config):void {

    // config
    config = _config;

    // stats
    if(Stats){
      stats = new Stats();
      document.body.appendChild(stats.domElement );  
    }

    // WebGLRenderer
    renderer = graphics.renderer(document.getElementById('space'));
    renderer.setClearColor(0xffffff, 1);

    // camera and light(s)
    console.log(`config.camera = `);
    console.dir(config.camera);
    camera = graphics.camera(config.camera);
    light.position.set(0, 10, 20);
    camera.add(light);
    camera.position.x = config.camera.position.x;
    camera.position.y = config.camera.position.y;
    camera.position.z = config.camera.position.z;
    lookAt = config.camera.lookAt;
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);

    // attach to camera for easy future ref by other modules using graphics
    camera['initial_position'] = config.camera.position;



    // scene > stage(1) > layers(i) > actors(i,j)
    // stage layers and depths
    nLayers = config.stage.layers.length;

    // scene - meta-container (uses nLayers)
    scene = graphics.scene();
    
    // initially all layer local coords match their global coords
    layersGlobal2Local = 0;

    layerDelta = config.stage.layerDelta;  // distance between layers
    deltaX = config.stage.deltaX;         // units between x 'index' marks

    // resize renderer and adjust camera aspect ratio
    window.addEventListener( 'resize', onWindowResize, false );
  }//init


  // render-loop - must run init first !!
  animate():void {

    et = clock.getElapsedTime();
    requestAnimationFrame( graphics.animate );

    // render each actor with a possible provided actor.render()
    for(let actor of Object.keys(actors)){
      if(actors[actor].render){
        actors[actor].render();
      }
    }
    if(stats){
      stats.update();
    }
    renderer.render( scene, camera );
  }

    
  // scene: meta-container - contains stage
  // stage: container-actor for all actor-graphics 
  // allows global transforms on all actors uniformly
  // NOTE: grid is in XZ plane so sy has no effect
  // thus graphics.scaleActor('stage') contains additional sz-scaling of grid
  // to sync the scaling with all other actors
  // NOTE: also it is quite possible grid will remain a canvas2D layer
  scene():THREE.Scene {

    if(scene === undefined){
      // scene, stage
      scene = new THREE.Scene();
      stage = new THREE.Group();
      actors['stage'] = stage;
      scene.add(stage);
  
      // layers
      // let d = camera.position.z (default = 10.0)
      // Then layer[i] is scaled by (d+layerDelta*i)/d
      // exp: suppose config.layerdelta = 0.5
      // grid ->        layers[0] z=0.0 scale= (d+0)/d = 1.0
      // glyph-quads -> layers[1] z=-0.5 scale= (d+0.5)/d = 1.05
      // line ->        layers[2] z=-1.0 scale= (d+1.0)/d = 1.1
      // sprite ->      layers[3] z=-1.5 scale= (d+1.5)/d = 1.15
      let d = camera.position.z;  
      console.log(`\n^^^ graphics.scene(): camera.position.z = ${d}`);
      console.log(`\n^^^ graphics.scene(): nLayers = ${nLayers}`);
      for(let i=0; i<nLayers; i++){
        console.log(`^^^ graphics.scene():create/add layer[${i}] to stage`);
        layers[i] = new THREE.Group();
        stage.add(layers[i]);
      }
    }
    return scene;
  }//scene()


  // default camera
  camera(camera_config:object):THREE.PerspectiveCamera {
    var fov:number,
        w:number,
        h:number, 
        aspect:number,
        near:number, 
        far:number,
        position:object;

    if(camera === undefined){
      fov = camera_config['fov'];
      w = window.innerWidth;
      h = window.innerHeight;
      aspect = w/h;
      near = camera_config['near'];
      far = camera_config['far'];
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera['position'].x = camera_config['position'].x;
      camera['position'].y = camera_config['position'].y;
      camera['position'].z = camera_config['position'].z;
    }
    return camera;
  }


  // default renderer - also store WebGLRenderContext gl 
  renderer(canvas:HTMLElement, width:number = window.innerWidth, height:number = window.innerHeight): THREE.WebGLRenderer {

    if(renderer === undefined){
      renderer = new THREE.WebGLRenderer({canvas:canvas});
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      
      // WebGLRenderingContext - used to get current WebGLProgram (shaders)
      gl = canvas['getContext']('webgl');
    }
    renderer.setSize(width, height );
    return renderer;
  }


  // get current WebGLProgram - shaders
  // NOTE: program attachment is transitory! (if more than one shader set)
  getCurrentWebGLProgram():THREE.WebGLProgram {
    return gl.getParameter(gl.CURRENT_PROGRAM);
  }


  layer(i:number=0):THREE.Group {
    return layers[i];
  }


  layer_type(l:number, type:string, options:object={}):void {
    var prev_type = config.stage.layer_type[l],
        flag = true;

    console.log(`\n\n*** graphics.layer_type(${l}, ${type})`);
    console.log(`prev_type of layer[${l}] = ${prev_type})`);
    config.stage.layer_type[l] = type;
    if(prev_type === 'invisible'){
      layers[l].visible = true;
      return;
    }
    if(type === 'invisible'){
      console.log(`setting layers[${l}].visible = false`);
      layers[l].visible = false;
    }else{
      console.log(`graphics.create(${type},${type}${l}, ${l}, options:`);
      console.dir(options);

//      for(let actor of layers[l].children){
//          console.log(`layers[${l}] contains actor ${actor.name}`);
//      }

      // remove non-grid non-axes from layer
      // NOTE: only increment i if skip 'grid' or 'axes' 
      // the children iterator points to the next available actor after removal
      for(let i=0; i<layers[l].children.length; ){
          let actor = layers[l].children[i];
          let actorname = actor.name || 'unknown';
          //console.log(`\nlayers[${l}] contains actor ${actorname}`);
          if(!actorname.startsWith('grid') && !actorname.startsWith('axes')){
            //console.log(`removing actor ${actorname} from layers[${l}]`);
            layers[l].remove(actor);
            if(prev_type === 'ohlc' || prev_type === 'candle'){
              console.log(`prev_type = ${prev_type} flag = ${flag}`);
              if(flag){
                graphics.removeActor(`${actorname}_recent`);
                graphics.removeActor(`${actorname}_past`);
                flag = false;
              }
            }else{
              graphics.removeActor(actorname);
            }
          }else{
            i = i+1;
          }
      }

      //graphics.create(type:string, name:string, layer:number, options:object)
      graphics.create(type, `${type}${l}`, l, options);

      console.log(`setting layers[${l}].visible = true`);
      layers[l].visible = true;
    }
    }//layer_type



  // create actor - give reference name and place in appropriate layer
  async create(type:string, name:string, layer:number, options:any):Promise<THREE.Object3D> {
    var past_ray:string,
        recent_ray:string,
        line:THREE.Line,
        mountain:THREE.Mesh,
        study:THREE.Line,
        sprite:THREE.Sprite,
        quad:THREE.Mesh,         // BufferGeometry & MeshBasicMaterial
        quad_shm:THREE.Mesh;    // BufferGeometry & ShaderMaterial
        

    try{
      switch(type){
        case 'grid':
          // grid is a graphics closure var
          grid = await Grid.create(options);  // Grid.create() returns Promise
          console.log(`grid = ${grid}`);
          graphics.addActor(name, grid, options);
          grid.position.z = -layer*layerDelta;
          layers[layer].add(grid);
          break;

        // rotateY(PI) so X-axis points negative (time)
        // and z-axis points positive depth (layer order)
        case 'axes':
          // axes is a graphics closure var
          axes = await Axes.create(options);  // Axes.create() returns Promise
          graphics.addActor(name, axes, options);
          //axes.rotateY(Math.PI);
          axes.position.z = -layer*layerDelta;
          layers[layer].add(axes);
          break;

        // Ohlc.create() returns {ohlc_past:ohlc[], ohlc_recent:ohlc[]}
        // these are distinct actors with convention-defined names:
        // '<symbol><layer>_past' and '<symbol><layer>_recent'
        // For exp: ETH0_past, ETH0_recent
        case 'ohlc':
          Ohlc.create(-layer*layerDelta, layers[layer], options)
            .then((tuple) => {
              console.log(`received tuple`);
              // add two glyph-arrays passed in tuple as actors for future ref
              past_ray = `${options['symbol']}${layer}_past`;
              recent_ray = `${options['symbol']}${layer}_recent`;
              console.log(`past_ray = ${past_ray}`);
              console.log(`recent_ray = ${recent_ray}`);
              graphics.addActor(past_ray, tuple['past'], options);
              graphics.addActor(recent_ray, tuple['recent'], options);
            });
          break;

        // Candle.create() returns {candle_past:candle[],candle_recent:candle[]}
        // these are distinct actors with convention-defined names:
        // '<symbol><layer>_past' and '<symbol><layer>_recent'
        // For exp: ETH0_past, ETH0_recent
        case 'candle':
          Candle.create(-layer*layerDelta, layers[layer], options)
            .then((tuple) => {
              console.log(`received tuple`);
              // add two glyph-arrays passed in tuple as actors for future ref
              past_ray = `${options['symbol']}${layer}_past`;
              recent_ray = `${options['symbol']}${layer}_recent`;
              console.log(`past_ray = ${past_ray}`);
              console.log(`recent_ray = ${recent_ray}`);
              graphics.addActor(past_ray, tuple['past'], options);
              graphics.addActor(recent_ray, tuple['recent'], options);
            });
          break;


        case 'line':
          // Line.create() returns Promise
//          Line.create(options).then((line) => {
//            line.position.z = -layer*layerDelta;
//            layers[layer].add(line);
//            graphics.addActor(name, line, options);
//          });
//          break;
          line = await Line.create(options);
          line.position.z = -layer*layerDelta;
          layers[layer].add(line);
          graphics.addActor(name, line, options);
          console.log(`after adding ${name} actors = ${Object.keys(actors)}`);
          break;

        case 'mountain':
          // Mountain.create() returns Promise
          console.log(`graphics.create(${type})`);
          mountain = await Mountain.create(options);
          console.log(`graphics.create(${type}) mountain = ${mountain}`);
          mountain.position.z = -layer*layerDelta;
          layers[layer].add(mountain);
          graphics.addActor(name, mountain, options);
          console.log(`after adding ${name} actors = ${Object.keys(actors)}`);
          break;

        case 'study':
          study = await Study.create(options); // Study.create() returns Promise
          graphics.addActor(name, study, options);
          study.position.z = -layer*layerDelta;
          layers[layer].add(study);
          break;

        case 'sprite':
          sprite = await Sprite.create(options);  // Sprite.create() returns Promise
          graphics.addActor(name, sprite, options);
          sprite.position.z = -layer*layerDelta;
          layers[layer].add(sprite);
          break;

        case 'quad':
          quad = await Quad.create(options);  // Quad.create() returns Promise
          graphics.addActor(name, quad, options);
          quad.position.z = -layer*layerDelta;
          layers[layer].add(quad);
          break;

        case 'quad_shm':
          quad_shm = await Quad_shm.create(options);  // Quad_shm.create() returns Promise
          graphics.addActor(name, quad_shm, options);
          quad_shm.position.z = -layer*layerDelta;
          layers[layer].add(quad_shm);
          break;

        case 'none':
          break;

        default:
          console.log(`%%% failed to create actor of type ${type}`);
      }
    }catch(e){
     console.log(`%%% error creating actor of type ${type}: ${e}`);
    }
  }//create()


  // add actor to actors by name
  // NOTE: options should be non-transient data - currently NOT updated
  addActor(name:string, actor:any, options:object):void {
    actor['name'] = name;
    actor['userData'] = options;
    //console.log(`addActor: name = ${name}`);
    //console.log(`addActor: actor = ${actor}`);
    //console.log(`addActor: options = ${options}`);
    actors[name] = actor;
  }

  removeActor(name:string):void {
    var filtered_actors;

//    console.log(`removeActor: name = ${name}`);
//    console.log(`before removal of ${name} actors = `);
//    for(let nm of Object.keys(actors)){
//      console.log(`actors contains name ${nm}`);
//    }
    if(actors[name]){
      //console.log(`removeActor: name = ${name}`);
      delete actors[name];
      //console.log(`after removal of ${name} actors = `);
      //console.dir(actors);
    }
//    }else{
//      console.log(`actor with name = ${name} not found!`);
//    }
  }

  // get actors
  actors():object {
    return actors;
  }

  // get actor by name
  actor(name:string):any {
    if(actors[name]){
      return actors[name];
    }else{
      console.log(`actor with name = ${name} does NOT exist!`);
    }
  }


  // scale actor by name
  // NOTE: stage is an actor with anme 'stage' (see scene())
  scaleActor(actor:string, sx:number, sy:number, sz:number):void {

    //console.log(`%%% scaling actor = ${actor} sx=${sx} sy=${sy} sz=${sz}`);
    if(actors[actor]){      
      // set local scale of actor
      // RECALL: if actor is 'stage' - all actor-children are scaled by 
      // stage.scale but keep their individual local scales
      actors[actor].scale.set(sx, sy, sz);
    }
  }



  // translateX camera and set camera.lookAt so camera remains orthogonal to all layers
  dollyX(tx:number = camera.position.x):void {
    let ty = camera.position.y;

    camera.position.set(tx, ty, camera.position.z);
    lookAt.x = tx;
    lookAt.y = ty;
    camera.lookAt(tx, ty, 0.0);
  }//dollyX()


  // translateY camera and set camera.lookAt so camera remains orthogonal to all layers
  dollyY(ty:number = camera.position.y):void {
    let tx = camera.position.x;

    camera.position.set(tx, ty, camera.position.z);
    lookAt.x = tx;
    lookAt.y = ty;
    camera.lookAt(tx, ty, 0.0);
  }//dollyY


  // rotate camera around its y-axis
  pan(p:number):void {
    camera.rotation.y = p;
    camera.updateProjectionMatrix();
  }

  // rotate camera around its x-axis
  tilt(t:number):void {
    camera.rotation.x = t;
    camera.updateProjectionMatrix();
  }

  // change camera fov
  zoom(_fov:number):void {
    camera.fov = _fov;
    camera.updateProjectionMatrix();
  }



  // modify value(s) of glyph in <current_symbol><layer>_recent
  mod_recent(symbol:string, layer:number, type:string, options:object){
    var modified_glyphs = options['data'].length/4,
        recent = graphics.actor(`${symbol}${layer}_recent`),
        modifications = Math.min(modified_glyphs, recent.length);

    console.log(`\nmod_recent: symbol=${symbol} layer=${layer} type=${type}`);
    console.log(`modififications = ${modifications}`);
    console.log(`options:`);
    console.dir(options);

    console.log(`recent actor = ${recent}`);
    console.log(`recent.length = ${recent.length}`);
    // sanity
    for(let i=0; i<recent.length; i++){
      console.log(`recent[${i}] instance of THREE.Group is ${recent[i] instanceof THREE.Group}`);
    }

    // set first_dynamic_index to number of added glyphs - 1 
    // these N-1 glyphs are returned by graphics.create 
    // in tuple['recent']:THREE.Group[] (called by graphics.append)
    console.log(`options['data'].length = ${options['data'].length}`);
    options['first_dynamic_index'] = options['data'].length/4 - 1;
    options['symbol'] = symbol;
    console.log(`options['first_dynamic_index'] = ${options['first_dynamic_index']}`);

    // delete glyphs to be modified
    for(let i=0; i<modifications; i++){
      console.log(`removing recent[${i}]`);
      recent[i].parent.remove(recent[0]);
    }

    // create new replacement glyphs based on xpositions and data 
    graphics.append(type, -layer*layerDelta, layer, layers[layer], recent, options);
    }//mod_recent


  // add value(s) of glyph in <current_symbol><layer>_recent
  // NOTE: add_recent is repetitive with new adds to the 'relatiev present
  // each time
  add_recent(symbol:string, layer:number, type:string, options:object){
    console.log(`\nadd_recent: symbol=${symbol} layer=${layer} type=${type}`);
    console.log(`options:`);
    console.dir(options);

    // get array of recent glyphs for the given symbol
    let recent = graphics.actor(`${symbol}${layer}_recent`);
    console.log(`recent actor = ${recent}`);

    // move all layers back 'in time' by the added 'present' in oreder to 
    // open space at first 'xpl' positions (in all layers)
    // increment layersGlobal2Local to reflect the translation of all layers
    // 'into the past' by translateX(-deltaX*xpl)
    // For exp. if deltaX=5 and nxp=1, and if a new glyph is to be added at 
    // global x=0, it must be added at local layers coord x=5
    let xpl = options['xpositions'].length;
    console.log(`xpositions.length = ${xpl}`);
    for(let i=0; i<layers.length; i++){
      layers[i].translateX(-deltaX * xpl);
    }

    // move grid and axes so they remain at global x=0
    grid.translateX(deltaX * xpl);
    axes.translateX(deltaX * xpl);

    // continuing the exp above, global x=0 must correspond to local x=5
    // functionally layersGlobal2Local(0) = 5
    // functionally layersGlobal2Local(10000) = 100005
    // etc...
    // each addition to 'the present' increments this global-to-local
    // translation 
    layersGlobal2Local += deltaX*xpl;
    console.log(`layersGlobal2Local = ${layersGlobal2Local}`);


    // translate options.xpositions from global to layer[l] coordinates
    // RECALL: layer[l].translateX(deltaX * xpl) - these are global coords
    // They must be localized for the new glyph(s) by adding deltaX*xpl
    // For exp, suppose deltaX=5 and one glyph is added at (global) x=0
    // Since glyphs are added in local layer coords in actor.create,
    // the exp glyph must be added at local layer x=5
    for(let i=0; i<xpl; i++){
      options['xpositions'][i] += layersGlobal2Local;
    }
    console.log(`local xpositions = ${options['xpositions']}`);

    // set first_dynamic_index to number of added glyphs - 1 
    // these N-1 glyphs are returned by graphics.create 
    // in tuple['recent']:THREE.Group[] (called by graphics.append)
    options['first_dynamic-index'] = options['data'].length/4 - 1;
    options['symbol'] = symbol;
    graphics.append(type, -layer*layerDelta, layer, layers[layer], recent, options);
  
  }//add_recent


  // add value(s) of glyph in <current_symbol><layer>_past
  // NOTE: add_past is NOT repetitive - new adds to the 'absolute' past require
  // specific coords EACH call
  add_past(symbol:string, layer:number, type:string, options:object){
    console.log(`\nadd_past: symbol=${symbol} layer=${layer} type=${type}`);
    console.log(`options:`);
    console.dir(options);

    // get array of past glyphs for the given symbol
    let past = graphics.actor(`${symbol}${layer}_past`);
    //console.log(`past actor = ${past}`);

    // NOTE: xpositions for add_past are unmodified since they are in the
    // correct 'local' layer coords
    // However, add_past is NOT repetitive - each invocation requires new
    // local coords 'further in the past' (i.s greater negative in x)
    console.log(`local xpositions = ${options['xpositions']}`);

    // set first_dynamic_index to number of added glyphs - 1 
    // these N-1 glyphs are returned by graphics.create 
    // in tuple['recent']:THREE.Group[] (called by graphics.append)
    options['first_dynamic_index'] = options['data'].length/4 - 1;
    options['symbol'] = symbol;
    graphics.append(type, -layer*layerDelta, layer, layers[layer], past, options);
    
  }//add_past


  append(type:string, depth:number, layer:number, layerGroup:THREE.Group, ray:THREE.Group[], options:object){
  console.log(`\n\n ###graphics.append: type = ${type} layer = ${layer} options=`);
    console.dir(options);

    switch(type){
      case 'ohlc':
        console.log(`append glyph(s) of type ${type} layerDelta = ${layerDelta}`);
        Ohlc.create(-layer*layerDelta, layerGroup, options)
          .then((tuple) => {
            let glyph:THREE.Object3D;
            console.log(`received tuple:`);
            console.dir(tuple);

            for(let i=0; i<tuple['recent'].length; i++){
              glyph = tuple['recent'][i];
              ray.push(glyph);
              console.log(`glyph = ${glyph}:`);
              //console.dir(glyph);
              layerGroup.add(glyph);
            }
        });      
        break;

      case 'candle':
        console.log(`append glyph(s) of type ${type} layerDelta = ${layerDelta}`);
        Candle.create(-layer*layerDelta, layerGroup, options)
          .then((tuple) => {
            let glyph:THREE.Object3D;
            console.log(`received tuple:`);
            console.dir(tuple);

            for(let i=0; i<tuple['recent'].length; i++){
              glyph = tuple['recent'][i];
              ray.push(glyph);
              console.log(`glyph = ${glyph}:`);
              //console.dir(glyph);
              layerGroup.add(glyph);
            }
          });      
        break;

      default:
        console.log(`%%% failed to append actor(s) of type ${type}`);

    }
  }//append

}//Graphics



// enforce singleton export
if(graphics === undefined){
  graphics = new Graphics();
}

export {graphics};
