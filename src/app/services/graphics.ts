// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';

import {Grid} from '../actors/grid';
import {Axes} from '../actors/axes';
import {Ohlc} from '../actors/ohlc';
import {Line} from '../actors/line';
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
    lookAt = config.camera.lookAt;
    camera.lookAt(lookAt.x, lookAt.y, lookAt.z);

    // attach to camera for easy future ref by other modules using graphics
    camera['initial_position'] = config.camera.position;


    // scene - meta-container
    // scene > stage(1) > layers(i) > actors(i,j)
    // stage layers and depths
    nLayers = config.stage.layers.length;
    layerDelta = config.stage.layerDelta;
    scene = graphics.scene();

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
        let s = (d+layerDelta*i)/d;
        console.log(`^^^ graphics.scene():layer[${i}] scale s = ${s}`);
        layers[i] = new THREE.Group();
        layers[i].scale.set(s, s, 1.0);
        //console.log(`layers[${i}].scale = ${layers[i].scale.toArray()}`);
        stage.add(layers[i]);
      }
      console.log(`\nactors:`);
      return scene;
    }
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
      position = camera_config['position'];
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


  layer_type(l:number, type:string):void {
    console.log(`graphics.layer_type(${l}, ${type})`);
    config.stage.layer_type[l] = type;
    if(type === 'invisible'){
      console.log(`setting layers[${l}].visible = false`);
      layers[l].visible = false;
    }else{
      console.log(`TBD: loading data for type = ${type} - currently 'line'`);
      console.log(`setting layers[${l}].visible = true`);
      layers[l].visible = true;
    }
  }


  // create actor - give reference name and place in appropriate layer
  async create(type:string, name:string, layer:number, options:any):Promise<THREE.Object3D> {
    var grid:THREE.GridHelper,
        axes:THREE.AxesHelper,
        ohlc_tuple:object,
        sprite:THREE.Sprite,
        line:THREE.Line,
        quad:THREE.Mesh,         // BufferGeometry & MeshBasicMaterial
        quad_shm:THREE.Mesh;    // BufferGeometry & ShaderMaterial
        

    try{
      switch(type){
        case 'grid':
          grid = await Grid.create(options);  // Grid.create() returns Promise
          console.log(`grid = ${grid}`);
          graphics.addActor(name, grid, options);
          grid.position.z = -layer*layerDelta;
          layers[layer].add(grid);
          return grid;

        // rotateY(PI) so X-axis points negative (time)
        // and z-axis points positive depth (layer order)
        case 'axes':
          axes = await Axes.create(options);  // Axes.create() returns Promise
          graphics.addActor(name, axes, options);
          //axes.rotateY(Math.PI);
          axes.position.z = -layer*layerDelta;
          layers[layer].add(axes);
          return axes;

        // Ohlc.create() returns object {past:ohlc[], recent:ohlc[]}
        case 'ohlc':
          ohlc_tuple = Ohlc.create(-layer*layerDelta, options.data); 
          console.log(`ohlc_tuple:`);
          console.dir(ohlc_tuple);
          //graphics.addActor(name, ohlc_past, options);
          //graphics.addActor(name, ohlc_recent, options);
          //layers[layer].add(ohlc_past);
          //layers[layer].add(ohlc_recent);
          return ohlc_tuple;

        case 'sprite':
          sprite = await Sprite.create(options);  // Sprite.create() returns Promise
          graphics.addActor(name, sprite, options);
          sprite.position.z = -layer*layerDelta;
          layers[layer].add(sprite);
          return sprite;

        case 'line':
          line = await Line.create(options);  // Line.create() returns Promise
          graphics.addActor(name, line, options);
          line.position.z = -layer*layerDelta;
          layers[layer].add(line);
          return line;


        case 'quad':
          quad = await Quad.create(options);  // Quad.create() returns Promise
          graphics.addActor(name, quad, options);
          quad.position.z = -layer*layerDelta;
          layers[layer].add(quad);
          return quad;

        case 'quad_shm':
          quad_shm = await Quad_shm.create(options);  // Quad_shm.create() returns Promise
          graphics.addActor(name, quad_shm, options);
          quad_shm.position.z = -layer*layerDelta;
          layers[layer].add(quad_shm);
          return quad_shm;


        default:
          console.log(`%%% failed to create actor of type ${type}`);
      }
    }catch(e){
     console.log(`%%% error creating actor of type ${type}: ${e}`);
    }
  }//create()


  // add actor to actors by name
  // NOTE: options should be non-transient data - currently NOT updated
  addActor(name:string, actor:THREE.Object3D, options:object):void {
    actor.name = name;
    actor.userData = options;
    actors[name] = actor;
  }

  // get actor by name
  actor(name:string):THREE.Object3D {
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

}//Graphics



// enforce singleton export
if(graphics === undefined){
  graphics = new Graphics();
}

export {graphics};
