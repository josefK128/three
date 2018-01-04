// dev-stage2.ts - simple test configuration

import {Config} from './config-stage2.interface';


// for space.ts initialization
const config:Config = {

  // controller app url
  _app: './app-es6/space2',


  // camera
  camera: {
    fov:90,
    near:0.5,
    far:100000,
    position:{x:-100, y:80, z:100},
    lookAt:{x:-100, y:80, z:0}
  },


  // stage: {
  //   layerDelta:number = 0.5,
  //   layers:object[][] = [
  //     [{name:string, type:string, layer:number=0, options:object=undefined, ...],
  //     [{name:string, type:string, layer:number=0, options:object=undefined}, ...],
  //     ...
  //   ]
  // }
  // EXP: 8 layers
  stage: {
    layerDelta: 5.0,
    layer_type: ['line','line','line','line','line','line','line','line'],
    layers: [
      [ {name:'grid0', type:'grid', layer:0, options:{ 
          size: 10000, divisions:1000, 
          centerLineColor: 0x000000, gridColor: 0x808000, 
          x: 0, y: 0, z: 0 }},
        {name:'line0', type:'line', layer:0, options:{
          max_vertices: 500, 
          drawCount:500, 
          color: 0xff00ff, 
          linewidth: 30, 
          vertices: [0,0,0, -10,30,0, -20,80,0]}}
      ],
      [ {name:'line1', type:'line', layer:1, options:{
          max_vertices: 500, 
          drawCount:500, 
          color: 0xff00ff, 
          linewidth: 30, 
          vertices: [0,0,0, -10,40,0, -20,70,0]}}
      ],
      [ {name:'line2', type:'line', layer:2, options:{
          max_vertices: 500, 
          drawCount:500, 
          color: 0xff00ff, 
          linewidth: 30, 
          vertices: [0,0,0, -10,50,0, -20,60,0]}},
      ],
      [ {name:'line3', type:'line', layer:3, options:{
          max_vertices: 500, 
          drawCount:500, 
          color: 0xff00ff, 
          linewidth: 30, 
          vertices: [0,0,0, -10,60,0, -20,50,0]}},
      ],
      [ {name:'line4', type:'line', layer:4, options:{
          max_vertices: 500, 
          drawCount:500, 
          color: 0xff00ff, 
          linewidth: 30, 
          vertices: [0,0,0, -10,70,0, -20,40,0]}},
      ],
      [ {name:'line5', type:'line', layer:5, options:{
          max_vertices: 500, 
          drawCount:500, 
          color: 0xff00ff, 
          linewidth: 30, 
          vertices: [0,0,0, -10,80,0, -20,30,0],}},
      ],
      [ {name:'line6', type:'line', layer:6, options:{
          max_vertices: 500, 
          drawCount:500, 
          color: 0xff00ff, 
          linewidth: 30, 
          vertices: [0,0,0, -10,90,0, -20,20,0],}},
      ],
      [ {name:'line7', type:'line', layer:7, options:{
          max_vertices: 500, 
          drawCount:500, 
          color: 0xff00ff, 
          linewidth: 30, 
          vertices: [0,0,0, -10,100,0, -20,10,0],}},
        {name:'axes7', type:'axes', layer:7, options:{size:3000}} 
      ]
    ]
  }

};


export {config};
