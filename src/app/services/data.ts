// data.ts - data-synthesis service - singleton
// method data.synthesize(first_dynamic_index:number=0, nglyphs:number=10,
//   deltaX:number=5, meanO:number=60, meanH:number=100, meanL:number=20,
//   meanC:number=60) 
// returns options object {first_dynamic_index, width, xpositions, data}
//   for use in graphics.create('ohlc', name, layer, options)
// typical usage is thus:
//   graphics.create('ohlc', `ohlc${layer}`, layer, data.synthesize(args))
//
// usage is by dependency injection or possibly by import:
// import {data} from './services/data';



// closure vars
var data:Data;



class Data {

synthesize(first_dynamic_index:number=0, nglyphs:number=10, deltaX:number=5, meanO:number=60, meanH:number=100, meanL:number=20, meanC:number=60):object { 

    var xpositions:number[]=[],
        data:number[]=[];

    // diagnostics
//    console.log(`\ndata.synthesize:`);
//    console.log(`first_dynamic_index = ${first_dynamic_index}`);
//    console.log(`nglyphs = ${nglyphs}`);
//    console.log(`deltaX = ${deltaX}`);
//    console.log(`meanO = ${meanO}`);
//    console.log(`meanC = ${meanH}`);
//    console.log(`meanL = ${meanL}`);
//    console.log(`meanC = ${meanC}`);


    // generate xpositions:number[nglyphs] and data:number[4*nglyphs]
    for(let i=0; i<nglyphs; i++){
      xpositions[i] = -i*deltaX;

      switch(i%4){
        case 0:
            data[i] = meanO + 10*Math.random() - 5.0;
            break;
        case 1:
            data[i] = meanH + 10*Math.random() - 5.0;
            break;
        case 2:
            data[i] = meanL + 10*Math.random() - 5.0;
            break;
        case 3:
            data[i] = meanC + 10*Math.random() - 5.0;
            break;
        default:
        console.log(`error in ${i} mod4 !!!!`);
      }
    }

    return {first_dynamic_index:first_dynamic_index, width:deltaX*0.4, xpositions:xpositions, data:data};

  }//synthesize
}//Data



// enforce singleton export
if(data === undefined){
  data = new Data();
}

export {data};
