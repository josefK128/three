// space.ts - basic Three.js graphics nucleus 


var graphics = {

  // default camera
  camera(fov:number = 90, aspect:number = window.innerWidth/window.innerHeight,
    near:number = 0.001, far:number = 1000.0):THREE.PerspectiveCamera {
    
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    return camera;
  },

  // default renderer 
  renderer(width:number = window.innerWidth, 
           height:number = window.innerHeight): THREE.WebGLRenderer {
    
    var renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer(document.getElementById("space"));

    renderer.setSize(width, height );
    return renderer;
  },

    
  // meta-container for all graphics
  scene():THREE.Scene {

    var scene:THREE.Scene = new THREE.Scene();

    // return meta-container - 'scene'
    return scene;
  }
};

