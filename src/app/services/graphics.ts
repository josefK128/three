// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';

import {Grid} from '../actors/grid';
import {Line} from '../actors/line';
import {Quad} from '../actors/quad';
import {Quad_shm} from '../actors/quad_shm';
import {Sprite} from '../actors/sprite';


// closure vars
var graphics:Graphics,
    gl:any,
    camera:THREE.PerspectiveCamera,
    lookAt:any = {x:0.0, y:0.0, z:0.0},
    controls:THREE.OrbitControls,
    scene:THREE.Scene,
    stage:THREE.Group,
    layers:THREE.Group[] = [],
    nLayers:number, 
    layerDelta:number,
    stats:Stats,
    renderer:THREE.WebGLRenderer,
    actors:object = {},
    clock:THREE.Clock = new THREE.Clock(),
    light:THREE.PointLight = new THREE.PointLight(),
    et:number = 0,  // elapsedTime from clock  
    init_options:object = {},
    count:number = 0,
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
  init(config:Config, options:object = {}):void {

    // stats
    if(Stats){
      stats = new Stats();
      document.body.appendChild(stats.domElement );  
    }

    // depth
    nLayers = config.nLayers;
    console.log(`nLayers = ${nLayers}`);
    layerDelta = config.layerDelta;
    console.log(`layerDelta = ${layerDelta}`);

    // camera and light(s)
    camera = graphics.camera();
    light.position.set(0, 10, 20);
    camera.add(light);
    controls = new THREE.OrbitControls(camera);

    // scene
    scene = graphics.scene();

    // WebGLRenderer
    renderer = graphics.renderer(document.getElementById('space'));

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
    controls.update();
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
      let d = camera.position.z;   // default=10.0
      console.log(`\n^^^ graphics.scene(): camera.position.z = ${d}`);
      for(let i=0; i<nLayers; i++){
        let s = (d+layerDelta*i)/d;
        console.log(`^^^ graphics.scene():layer[${i}] scale s = ${s}`);
        layers[i] = new THREE.Group();
        layers[i].scale.set(s, s, 1.0);
        console.log(`layers[${i}].scale = ${layers[i].scale.toArray()}`);
        console.log(`adding layers[${i}] to stage`);
        stage.add(layers[i]);
      }
      return scene;
    }
  }//scene()


  // default camera
  camera(fov:number=90, aspect:number=window.innerWidth/window.innerHeight, near:number=0.5, far:number=1000.0, z:number=10):THREE.PerspectiveCamera {

  var w:number = window.innerWidth,
      h:number = window.innerHeight;

    if(camera === undefined){
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = z;
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


  // create actor - give reference name
  // place in appropriate layer
  // let d = camera.position.z (default = 10.0)
  // Then layer[i] is scaled by (d-layerZ[i])/d
  // grid ->        layers[0] z=0.0 scale= (d-z)/d = 1.0
  // glyph-quads -> layers[1] z=-0.5 scale= (d+0.5)/d = 1.05
  // line ->        layers[2] z=-1.0 scale= (d+1.0)/d = 1.1
  // sprite ->      layers[3] z=-1.5 scale= (d+1.5)/d = 1.15
  async create(type:string, name:string, layer:number, options:any):Promise<THREE.Object3D> {
    var grid:THREE.GridHelper,
        line:THREE.Line,
        quad:THREE.Mesh,         // BufferGeometry & MeshBasicMaterial
        quad_shm:THREE.Mesh,    // BufferGeometry & ShaderMaterial
        sprite:THREE.Sprite;
        

        //console.log(`%%% request to create actor ${name} of type ${type}`);
    try{
      switch(type){
        case 'grid':
          grid = await Grid.create(options);  // Grid.create() returns Promise
          actors[name] = grid;
          grid.position.z = -layer*layerDelta;
          layers[layer].add(grid);
          return grid;

        case 'quad':
          quad = await Quad.create(options);  // Quad.create() returns Promise
          actors[name] = quad;
          quad.position.z = -layer*layerDelta;
          layers[layer].add(quad);
          return quad;

        case 'quad_shm':
          quad_shm = await Quad_shm.create(options);  // Quad_shm.create() returns Promise
          actors[name] = quad_shm;
          quad_shm.position.z = -layer*layerDelta;
          layers[layer].add(quad_shm);
          return quad_shm;

        case 'sprite':
          sprite = await Sprite.create(options);  // Sprite.create() returns Promise
          actors[name] = sprite;
          sprite.position.z = -layer*layerDelta;
          layers[layer].add(sprite);
          return sprite;

        case 'line':
          line = await Line.create(options);  // Line.create() returns Promise
          actors[name] = line;
          line.position.z = -layer*layerDelta;
          layers[layer].add(line);
          return line;


        default:
          console.log(`%%% failed to create actor of type ${type}`);
      }
    }catch(e){
     console.log(`%%% error creating actor of type ${type}: ${e}`);
    }
  }//create()


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
    if(actors[actor]){
      console.log(`%%% scaling actor = ${actor} sx=${sx} sy=${sy} sz=${sz}`);
      
      // set local scale of actor
      // RECALL: if actor is 'stage' - all actor-children are scaled by 
      // stage.scale but keep their individual local scales
      actors[actor].scale.set(sx, sy, sz);

      // TMP! - modify local scale to sync effect of stage-scale
      // RECALL: 'grid1' is NOT a child of stage
      // scale vertical axis (Z) for grid (in XZ plane)
      if(actor === 'stage'){    
        actors['grid1'].scale.set(sx, sz, sy);
      }
    }
  }


  dollyX(tx:number = 0.0, ty:number = 0.0):void {
    let cp = camera.position;

    // translate camera and set controls lookAt-target so camera remains
    // orthogonal to all layers
    camera.translateX(tx);
    lookAt.x += tx;
    controls.target.set(lookAt.x, lookAt.y, lookAt.z);
    console.log(`camera now located at [${cp.x}, ${cp.y}, ${cp.z}]`);
    console.log(`camera looking at [${lookAt.x}, ${lookAt.y}, ${lookAt.z}]`);

    // NOTE: layer[0] needs no adjustment - it is the z=0 projection plane
    // NOTE: layer[i].children is an array of actors
    for(let i=1; i<nLayers; i++){
      for(let actor of layers[i].children){
        // adjust grid positions so actors project correctly onto z=0 plane
        actor.translateX(tx/cp.z * actor.position.z);
        actor.translateY(ty/cp.z * actor.position.z);
      }
    }
  }//dolly()

}//Graphics



// enforce singleton export
if(graphics === undefined){
  graphics = new Graphics();
}

export {graphics};
