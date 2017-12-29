// dev-stage2.ts - simple test configuration

import {Config} from './config-stage2.interface';


// for space.ts initialization
const config:Config = {

  // controller app url
  _app: './app-es6/space2',

  // number of layers
  nLayers: 4,
  // layer delta - distance between adjacent layers
  layerDelta: 0.5

};


export {config};
