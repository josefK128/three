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
    graphics.init(config);

    // read config - create data objects - inject each with graphics service
    // NOTE: graphics service is a singleton
    // TBD


    // mock data-object creation of graphics actors
    // NOTE: initially use default options
    graphics.create('grid', 'grid1', 0, options);
    graphics.create('quad', 'quad1', 1, options);
    graphics.create('quad_shm', 'quad_shm1', 1, options);   
    graphics.create('sprite', 'sprite1', 2, options);
    graphics.create('line', 'line1', 3, options);


    // dolly camera into past with present at right edge and scale actors
    setTimeout(() => {

      console.log(`\n*** graphics.dollyX(-10.0) & extend line vertices`);
      console.log(`expand the visible vertices of 'line1'`);
      graphics.dollyX(-10.0);
      graphics.actor('line1').geometry.setDrawRange(0, 90);

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
