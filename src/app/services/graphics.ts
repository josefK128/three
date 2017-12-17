// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';

import {Grid} from '../actors/Grid';
import {Line} from '../actors/Line';
import {Quad} from '../actors/Quad';



// closure vars
var graphics:Graphics,
    gl:any,
    camera:THREE.PerspectiveCamera,
    lookAt:any = {x:0.0, y:0.0, z:0.0},
    controls:THREE.OrbitControls,
    scene:THREE.Scene,
    stage:THREE.Group,
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
  init(options:object = {}):void {

    // scene
    scene = graphics.scene();

    // stats
    if(Stats){
      stats = new Stats();
      document.body.appendChild(stats.domElement );  
    }

    // camera and light(s)
    camera = graphics.camera();
    light.position.set(0, 10, 20);
    camera.add(light);
    controls = new THREE.OrbitControls(camera);

    // WebGLRenderer
    renderer = graphics.renderer(document.getElementById('space'));

    // resize renderer and adjust camera aspect ratio
    window.addEventListener( 'resize', onWindowResize, false );
  }


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
      scene = new THREE.Scene();
      stage = new THREE.Group();
      actors['stage'] = stage;
      scene.add(stage);
    }
    return scene;
  }


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
  async actor(type:string, name:string):Promise<THREE.Object3D> {
    var grid:THREE.GridHelper,
        line:THREE.Line,
        quad:THREE.Quad,
        cp:THREE.Vector3 = camera.position,
        layerScale:number;

        //console.log(`%%% request to create actor ${name} of type ${type}`);
    try{
      switch(type){
        case 'grid':
          grid = await Grid.create();  // Grid.create() returns Promise
          actors[name] = grid;
scene.add(grid);    // grid is in different plane than other actors!
          return grid;

        case 'line':
          line = await Line.create();  // Line.create() returns Promise
          // perspective-scale actor according to layer depth so each actor
          // appears to exist at local size on grid-layer (z=0 XZ plane)
          //layerScale = (10.0-quad.position.z)/10.0;
          layerScale = (cp.z-line.position.z)/cp.z;
          line.scale.set(layerScale,layerScale,1.0);
          actors[name] = line;
          stage.add(line);
          return line;

        case 'quad':
          quad = await Quad.create();  // Quad.create() returns Promise
          // perspective-scale actor according to layer depth so each actor
          // appears to exist at local size on grid-layer (z=0 XZ plane)
          layerScale = (cp.z-quad.position.z)/cp.z;
          quad.scale.set(layerScale,layerScale,1.0);
          actors[name] = quad;
          stage.add(quad); 
          return quad;

        default:
          console.log(`%%% failed to create actor of type ${type}`);
      }
    }catch(e){
     console.log(`%%% error creating actor of type ${type}: ${e}`);
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


  dollyX(dx:number = 0.0):void {
    let q = actors['quad1'],
        l = actors['line1'],
        qp = q.position,
        lp = l.position,
        cp = camera.position,
        qdt,
        ldt;

    // diagnostics
    console.log(`\n@@@`);
    console.log(`pre:quad.scale = [${q.scale.x},${q.scale.y},${q.scale.z}]`);

    // translate camera and set controls lookAt-target so camera remains
    // orthogonal to all layers
    camera.translateX(dx);
    lookAt.x += dx;
    controls.target.set(lookAt.x, lookAt.y, lookAt.z);
    console.log(`camera now located at [${cp.x}, ${cp.y}, ${cp.z}]`);
    console.log(`camera looking at [${lookAt.x}, ${lookAt.y}, ${lookAt.z}]`);

    // adjust grid positions so actors project correctly onto z=0 plane
    // layer0 
    // no perspective adjustment needed - it is the z=0 projection plane

    // layer1
    qdt = dx/cp.z * qp.z;
    console.log(`for correct projection of layer ${qp.z}, x-translating quad by ${qdt}`);
    q.translateX(qdt);

    // layer2
    ldt = dx/cp.z * lp.z;
    console.log(`for correct projection of layer ${lp.z}, x-translating line by ${ldt}`);
    l.translateX(ldt);

    // adjust number of visible line vertices to 90 (arbitrary POC)
    actors['line1'].geometry.setDrawRange(0, 90);

    // diagnostics
    console.log(`post:quad.scale = [${q.scale.x},${q.scale.y},${q.scale.z}]`);
    console.log(`@@@\n`);
  }

}//Graphics



// enforce singleton export
if(graphics === undefined){
  graphics = new Graphics();
}

export {graphics};
