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

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height );
    return renderer;
  },

    
  // meta-container for all graphics
  scene():THREE.Scene {

    var scene:THREE.Scene = new THREE.Scene(),
        gridh:THREE.GridHelper = new THREE.GridHelper(10, 10),
        grid:THREE.Object3D = graphics.createGrid();

    // add grid to scene
    scene.add(gridh);
    scene.add(grid);

    // return meta-container - 'scene'
    return scene;
  },


  createGrid(opts?):THREE.Object3D {
    var config = opts || {
      height: 500,
      width: 500,
      linesHeight: 10,
      linesWidth: 10,
      color: 0xDD006C
    },
    material = new THREE.LineBasicMaterial({
      color: config.color,
      opacity: 0.2
    }),
    gridObject = new THREE.Object3D(),
    gridGeo = new THREE.Geometry(),
    stepw = 2 * config.width / config.linesWidth,
    steph = 2 * config.height / config.linesHeight,
    line:THREE.Line;
  
    //width
    for (let i = -config.width; i <= config.width; i += stepw) {
      gridGeo.vertices.push(new THREE.Vector3(-config.height, i, 0));
      gridGeo.vertices.push(new THREE.Vector3(config.height, i, 0));
  
    }
    //height
    for (let i = -config.height; i <= config.height; i += steph) {
      gridGeo.vertices.push(new THREE.Vector3(i, -config.width, 0));
      gridGeo.vertices.push(new THREE.Vector3(i, config.width, 0));
    }
  
    line = new THREE.Line(gridGeo, material, THREE.LineSegments);
    gridObject.add(line);
  
    return gridObject;
  }

};

