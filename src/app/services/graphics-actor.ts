// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';

import {Grid} from '../actors/Grid';
import {Line} from '../actors/Line';



// closure vars
var graphics:Graphics,
    camera:THREE.PerspectiveCamera,
    controls:THREE.OrbitControls,
    scene:THREE.Scene,
    renderer:THREE.WebGLRenderer,
    actors:object = {},
    clock:THREE.Clock = new THREE.Clock(),
    light:THREE.PointLight = new THREE.PointLight(),
    et:number = 0,  // elapsedTime from clock  
    init_options:object = {},
    onWindowResize:function = () => {
      let w = window.innerWidth,
          h = window.innerHeight;
          
      console.log(`onWindowResize w=${w} h=${h}`);
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
    //camera.position.x = 100 * Math.cos( time );
    //camera.position.z = 50 + 10 * Math.sin( time );
    controls.update();
    renderer.render( scene, camera );
  }



    
  // meta-container for all graphics
  scene():THREE.Scene {

    if(scene === undefined){
      scene = new THREE.Scene();
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


  // default renderer 
  renderer(canvas:HTMLElement, width:number = window.innerWidth, height:number = window.innerHeight): THREE.WebGLRenderer {

    if(renderer === undefined){
      renderer = new THREE.WebGLRenderer({canvas:canvas});
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
    renderer.setSize(width, height );
    return renderer;
  }


  // create actor - give reference name
  async actor(type:string, name:string):Promise<THREE.Object3D> {
    var grid:THREE.GridHelper,
        line:THREE.line;

    console.log(`%%% request to create actor ${name} of type ${type}`);
    try{
      switch(type){
        case 'grid':
          grid = await Grid.create();  // Grid.create() returns Promise
          console.log(`%%% grid =`);
          console.dir(grid);
          console.log(`%%% typeof grid = ${typeof grid}`);
          console.log(`%%% adding grid to actors =${actors} and scene = ${scene}`);
          actors[name] = grid;
          scene.add(grid);
          return grid;

        case 'line':
          console.log(`%%% case 'line'`);
          line = await Line.create();  // Line.create() returns Promise
          console.log(`%%% line =`);
          console.dir(line);
          console.log(`%%% typeof line = ${typeof line}`);
          console.log(`%%% adding line to actors =${actors} and scene = ${scene}`);
          actors[name] = line;
          scene.add(line);
          return line;

        default:
          console.log(`%%% failed to create actor of type ${type}`);
      }
    }catch(e){
     console.log(`%%% error creating actor of type ${type}: ${e}`);
    }
  }


  scaleActor(actor:string, sx:number, sy:number, sz:number):void {
    if(actors[actor]){
    console.log(`%%% scaling actor = ${actor} sx=${sx} sy=${sy} sz=${sz}`);
      actors[actor].scale.set(sx, sy, sz);
      actors[actor]._scale(sx, sy, sz);
    }
  }


  pastCamera():void {
    console.log(`camera looking at past(x<0) ONLY...`);
    actors['line1'].geometry.setDrawRange(0, 90);
    controls.target.set( -40, 0, 0 );
    camera.translateX(-40);
  }

  // not used!
  presentCamera():void {
    console.log(`camera looking at past(x<0) present(x=0) and future(x>0)...`);
    controls.target.set( 0, 0, 0 );
    camera.translateX(40);
  }

}//Graphics



// enforce singleton export
if(graphics === undefined){
  graphics = new Graphics();
}

export {graphics};
