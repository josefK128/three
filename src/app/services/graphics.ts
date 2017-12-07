// graphics.ts - Three.js graphics service - singleton
// usage is by dependency injection or possibly by import:
// import {graphics} from './services/graphics';


// closure vars
var graphics:Graphics,
    camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.001, 1000 ),
    renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer(document.getElementById("space"), camera),
    scene:THREE.Scene = new THREE.Scene();


class Graphics {

  // default camera
  camera(fov:number = 90, aspect:number = window.innerWidth/window.innerHeight,
    near:number = 0.001, far:number = 1000.0):THREE.PerspectiveCamera {
    
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    return camera;
  }

  // default renderer 
  renderer(width:number = window.innerWidth, 
           height:number = window.innerHeight): THREE.WebGLRenderer {
    
    var renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer(document.getElementById("space"));

    renderer.setSize(width, height );
    return renderer;
  }

    
  // meta-container for all graphics
  scene():THREE.Scene {

    var scene:THREE.Scene = new THREE.Scene();

    // return meta-container - 'scene'
    return scene;
  }
}//Graphics



// enforce singleton export
if(graphics === undefined){
  graphics = new Graphics();
}

export {graphics};


