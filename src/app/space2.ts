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
    graphics.init(config);


    // initialize graphics service with config stage-layers-actors
    // NOTE: initially use default options
    for(let layer of config.stage['layers']){
      for(let actor of layer){
        //graphics.create('grid', 'grid1', 0, undefined);
        graphics.create(actor['type'], actor['name'], actor['layer'], actor['options']);
      }
    }


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
