// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';

import {Grid} from '../actors/Grid';



// closure vars
var graphics:Graphics,
    camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.001, 1000 ),
    renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer(document.getElementById("space"), camera),
    scene:THREE.Scene = new THREE.Scene();


class Graphics {

  // default camera
  camera(fov:number = 90, aspect:number = window.innerWidth/window.innerHeight, near:number = 0.001, far:number = 1000.0):THREE.PerspectiveCamera {

    return camera;
  }

  // default renderer 
  renderer(width:number = window.innerWidth, height:number = window.innerHeight): THREE.WebGLRenderer {
    
    renderer.setSize(width, height );
    return renderer;
  }

    
  // meta-container for all graphics
  scene():THREE.Scene {

    // return meta-container - 'scene'
    return scene;
  }


  // create and return grid
  async grid():THREE.GridHelper {
    var grid:THREE.GridHelper;

    console.log(`Grid =`);
    console.dir(Grid);
    try{
      grid = await Grid.create();
      console.log(`grid =`);
      console.dir(grid);
      console.log(`adding grid to scene = ${scene}`);
      scene.add(grid);
      return grid;
    }catch(e){
      console.log(`failed to create grid: ${e}`);
    }
  }      

}//Graphics



// enforce singleton export
if(graphics === undefined){
  graphics = new Graphics();
}

export {graphics};
