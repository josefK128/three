// gui.ts - Three.js gui controller - singleton
// usage is by dependency injection or possibly by import:
// import {gui} from './services/gui';


// closure vars
var gui:Gui,
    graphics:Graphics;


class Gui {

  // init scene, camera, renderer  etc.
  init(_graphics:Graphics, options:object = {}):void {
    graphics = _graphics;
  }//init

}//Gui



// enforce singleton export
if(gui === undefined){
  gui = new Gui();
}

export {gui};
