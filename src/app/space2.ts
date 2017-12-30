// space.ts - graphics bootstrap application which initializes
// the graphics service (graphics.ts) and the graphics controller (ui.ts)
// from the config-file

import {graphics} from './services/graphics';
import {ui} from './controllers/ui';

var space:Space,
    options:any;


class Space {

  init(config:Config = {}):void {
    console.log(`space.init: config = `);
    console.dir(config);

    // initialize scene, renderer, camera, light(s) etc.
    graphics.init(config, options);


    // mock data-object creation of graphics actors
    // NOTE: initially use default options
    graphics.create('grid', 'grid1', 0, options);


    // initialize ui (gui)
    ui.init(graphics, config);

    // render loop
    graphics.animate();
  }//init

}//Space


// enforce singleton export
if(space === undefined){
  space = new Space();
}

export {space};
