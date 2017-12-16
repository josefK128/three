// space.ts - future graphics bootstrap application which builds
// data-objects and injects the graphics service

import {graphics} from './services/graphics';

var space:Space;



class Space {

  init(config:object = {}):void {
    console.log(`space.init: config = `);
    console.dir(config);

    // initialize scene, renderer, camera, light(s) etc.
    graphics.init();

    // read config - create data objects - inject each with graphics service
    // NOTE: graphics service is a singleton
    // TBD


    // mock data-object creation of graphics actors
    graphics.actor('grid', 'grid1');
    graphics.actor('line', 'line1');
    graphics.actor('quad', 'quad1');


    // dolly camera into past with present at right edge and scale actors
    setTimeout(() => {
      console.log(`scaling entire stage by sy=0.5`);
      graphics.scaleActor('stage', 1.0, 0.5, 1.0);
      console.log(`translating grid x=0 'now' to right edge of window`);
      console.log(`NOTE: scaling of grid and stage is uniform from origin, not from center of window`);
      graphics.pastCamera();

      setTimeout(() => {
        console.log(`scaling entire stage by sy=1.0 - re-normalize`);
        graphics.scaleActor('stage', 1.0, 1.0, 1.0);
        
        setTimeout(() => {
          graphics.scaleActor('line1', 1.0, 0.5, 1.0);
          graphics.scaleActor('quad1', 1.0, 0.5, 1.0);
          // grid is defined in XZ-plane and then rotated by PI/2
          // Thus the vertical axis is Z (horizontal axis is X)
          graphics.scaleActor('grid1', 1.0, 1.0, 0.5);
        }, 10000);
      }, 10000);
    },10000);

    // render loop
    graphics.animate();
  }//init

}//Space


// enforce singleton export
if(space === undefined){
  space = new Space();
}

export {space};
