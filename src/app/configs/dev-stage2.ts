// dev-stage2.ts - simple test configuration

import {Config} from './config-stage2.interface';


// for space.ts initialization
const config:Config = {

  // controller app url
  _app: './app-es6/space2',


  // stage: {
  //   layerDelta:number = 0.5,
  //   layers:object[][] = [
  //     [{name:string, type:string, layer:number=0, options:object={}}, ...],
  //     [{name:string, type:string, layer:number=0, options:object={}}, ...],
  //     ...
  //   ]
  // }
  stage: {
    layerDelta: 0.5,
    layers: [
      [{name:'grid1', type:'grid', layer:0, options:undefined}]
    ]
  }

};


export {config};
