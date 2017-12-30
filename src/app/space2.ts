// space.ts - future graphics bootstrap application which builds
// data-objects and injects the graphics service

import {graphics} from './services/graphics';

var space:Space,
    options:any;


class Space {

  init(config:Config = {}):void {
    console.log(`space.init: config = `);
    console.dir(config);

    // initialize scene, renderer, camera, light(s) etc.
    graphics.init(config, options);

    // read config - create data objects - inject each with graphics service
    // NOTE: graphics service is a singleton
    // TBD


    // mock data-object creation of graphics actors
    // NOTE: initially use default options
    graphics.create('grid', 'grid1', 0, options);

    // render loop
    graphics.animate();
  }//init

}//Space


// enforce singleton export
if(space === undefined){
  space = new Space();
}

export {space};
