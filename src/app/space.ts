// space.ts - future graphics bootstrap application which builds
// data-objects and injects the graphics service

import {graphics} from './services/graphics';

var space:Space,
    options:any;


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
    // NOTE: initially use default options
    graphics.actor('grid', 'grid1', options);
    graphics.actor('line', 'line1', options);
    graphics.actor('quad', 'quad1', options);
    graphics.actor('sprite', 'sprite1', options);


    // dolly camera into past with present at right edge and scale actors
    setTimeout(() => {
      console.log(`\n*** graphics.dollyX(-10.0)`);
      graphics.dollyX(-10.0);

      setTimeout(() => {
        console.log(`*** scaling entire stage by sy=0.5`);
        graphics.scaleActor('stage', 1.0, 0.5, 1.0);
        // grid is defined in XZ-plane and then rotated by PI/2
        // Thus the vertical axis is Z (horizontal axis is X)
        graphics.scaleActor('grid1', 1.0, 1.0, 0.5);
        
        setTimeout(() => {
          console.log(`*** scaling each actor by sy=1.0 - re-normalize`);
          graphics.scaleActor('stage', 1.0, 1.0, 1.0);
          setTimeout(() => {
            console.log(`\n*** graphics.dollyX(10.0)`);
            graphics.dollyX(10.0);
          }, 10000);
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
