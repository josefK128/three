// data.ts - data-synthesis service - singleton
// method data.synthesize(first_dynamic_index:number, nglyphs:number,
//   deltaX:number, meanY:number) returns options object for use in
//   data.create('ohlc', name, layer, options)
//
// usage is by dependency injection or possibly by import:
// import {data} from './services/data';



// closure vars
var data:Data;



class Data {

  synthesize(first_dynamic_index:number, nglyphs:number, deltaX:number, meanY:number):object {
    console.log(`\ndata.synthesize:`);
    console.log(`first_dynamic_index = ${first_dynamic_index}`);
    console.log(`nglyphs = ${nglyphs}`);
    console.log(`deltaX = ${deltaX}`);
    console.log(`meanY = ${meanY}`);

    return {};
  }//synthesize

}//Data



// enforce singleton export
if(data === undefined){
  data = new Data();
}

export {data};
