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
    controls:THREE.OrbitControls,
    scene:THREE.Scene,
    stage:THREE.Group,
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

    // camera and light(s)
    camera = graphics.camera();
    light.position.set(0, 100, 200);
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

    //camera.position.x = 100 * Math.cos( time );
    //camera.position.z = 50 + 10 * Math.sin( time );
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
  camera(fov:number = 90, aspect:number = window.innerWidth/window.innerHeight, near:number = 0.001, far:number = 1000.0):THREE.PerspectiveCamera {

    if(camera === undefined){
      camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.001, 1000 );
      camera.position.z = 38;
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
        quad:THREE.Quad;

        //console.log(`%%% request to create actor ${name} of type ${type}`);
    try{
      switch(type){
        case 'grid':
          //console.log(`%%% case 'grid'`);
          grid = await Grid.create();  // Grid.create() returns Promise
          actors[name] = grid;
          scene.add(grid);    // grid is in different plane than other actors!
          //stage.add(grid);
          return grid;

        case 'line':
          //console.log(`%%% case 'line'`);
          line = await Line.create();  // Line.create() returns Promise
          actors[name] = line;
          stage.add(line);
          return line;

        case 'quad':
          //console.log(`%%% case 'quad'`);
          quad = await Quad.create();  // Quad.create() returns Promise
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
      actors[actor].scale.set(sx, sy, sz);
      
      // scale vertical axis (Z) for grid (in XZ plane)
      if(actor === 'stage'){    
        actors['grid1'].scale.set(sx, sz, sy);
      }
      if(actors[actor]._scale){
        actors[actor]._scale(sx, sy, sz);
      }
    }
  }



  pastCamera():void {
    console.log(`camera looking at past(x<0) ONLY...`);
    actors['line1'].geometry.setDrawRange(0, 90);
    controls.target.set( -32, 0, 0 );
    camera.translateX(-32);
  }

  // not used!
  presentCamera():void {
    console.log(`camera looking at past(x<0) present(x=0) and future(x>0)...`);
    controls.target.set( 0, 0, 0 );
    camera.translateX(32);
  }

}//Graphics



// enforce singleton export
if(graphics === undefined){
  graphics = new Graphics();
}

export {graphics};
