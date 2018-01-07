// ohlc.ts
// optimized to create all ohlc-glyphs in one create call
// returns promise resolving an object containing the two time-ray arrays
// 'past' which are static glyphs pointing into the past and whose 0th element 
// is the glyph representing data[options.first_dynamic_index + 1], and
// 'recent' which are dynamic glyph(s) pointing in the future direction and
// whose 0th element is the glyph represented by data[first_dynamic_index]
//
// arguments to create are:
// depth:number - z-depth at which to create the set of glyphs
// layer:number - index of layer which is the parent THREE.Group of glyph set
// options:object containing
//   first_dynamic_index:number (see above)
//   width:number - width of the three quad components of the ohlc-glyph
//   xpositions:number[] - glyph.x position of the glyph on the x 'time' axis
//   dat:number[] - sequence of open, high, low, close y-values for each glyph
//
// kth ohlc glyph is a central quad of width 'width' and height (high-low)
// located at (xposition[k], (high-low)/2)
// The kth opening quad 'quadO' is a square-quad of width(=height) = 'width' 
// and located at (xposition[k]-width/2, open)
// The kth closing quad 'quadC' is a square-quad of width(=height) = 'width' 
// and located at (xposition[k]+width/2, close)



export var Ohlc = {

  // create ohlc-bar actors 
  create: (depth:number, layer:THREE.Group, options:object):Promise<object> => {

    console.log(`ohlc.create() depth=${depth} layer=${layer} options= `);
    console.dir(options);
    
    var nglyphs = options['data'].length/4,
        first_dynamic_index:number = options['first_dynamic_index'],
        width:number = options['width'],
        xpositions:number[] = options['xpositions'],
        data:number[] = options['data'],

        // constants needed in each iteration loop
        halfwidth:number = width*0.5,
        quad_depth:number = -0.01,
        quadOC_depth:number = -0.02,

        // rays past and recent-'future' in data-set
        // these are the 'time-rays' returnd in the promise resolution
        past:THREE.Group[] = [],
        recent:THREE.Group[] = [],

        // iterations placeholders for glyph construction
        actor:THREE.Group, 
        open:number,
        high:number,
        low:number,
        close:number,
  
        // values derived from open, high, low and close
        last_static_index:number = first_dynamic_index + 1,
        dhl:number,
        yhl:number,
        glyph_color:string,
  
        // actor - three components
        // [1] quad: high-low
        quad_g:THREE.PlaneBuffergeometry,
        quad_m:THREE.Material,
        quad:THREE.Mesh,
  
        // [2a] quadO: opening
        vertices:Float32Array,
        quadO_g:THREE.PlaneBufferGeometry,
        quadO_m:THREE.Material,
        quadO:THREE.Mesh,
  
        // [2b] quadC: close
        quadC_g:THREE.PlaneBufferGeometry,
        quadC_m:THREE.Material,
        quadC:THREE.Mesh,

        promise = new Promise((resolve, reject) => {
          try{
            // glyph construction iteration
            for(let i=0; i<nglyphs; i++){
              actor = new THREE.Group();
              open = data[4*i];
              high = data[4*i + 1];
              low = data[4*i + 2];
              close = data[4*i + 3];
        
              // values derived from open, high, low and close
              dhl = Math.max(high-low, 1.0);
              yhl = (high + low)*0.5;
              glyph_color = open > close ? 'red' : 'green';
        
              // three components:
              // [1] quad: high-low
              quad_g = new THREE.PlaneBufferGeometry(width, dhl);
              quad_m = new THREE.MeshBasicMaterial({color:glyph_color, transparent:false});
              quad = new THREE.Mesh(quad_g, quad_m);
              quad.position.y = yhl;
              quad.position.z = depth-0.01;
              actor.add(quad);
              
              // [2a] quadO: open
              console.log(`width = ${width}`);
              quadO_g = new THREE.PlaneBufferGeometry(width, width);
              quadO_m = new THREE.MeshBasicMaterial( {color:glyph_color, transparent:false} );
              quadO = new THREE.Mesh(quadO_g, quadO_m);
              quadO.position.x = -0.5*width;
              quadO.position.y = open;
              quadO.position.z = depth-0.02;
              actor.add( quadO );       
            
              // [2b] quadC: close
              quadC_g = new THREE.PlaneBufferGeometry(width, width);
              quadC_m = new THREE.MeshBasicMaterial( {color:glyph_color, transparent:false} );
              quadC = new THREE.Mesh(quadC_g, quadC_m);
              quadC.position.x = 0.5*width;
              quadC.position.y = close;
              quadC.position.z = depth-0.02;
              actor.add( quadC );  
        
        
              // set position.x from xpositions array and add to layer
              actor.position.x = xpositions[i];
              layer.add(actor);
        
              // add to static 'past' or dynamic 'recent' arrays of actors(THREE.Group)
              console.log(`ohlc for-loop: i = ${i}`);
              console.log(`actor[${i}].position.x = ${actor.position.x}`);
              if(i <= first_dynamic_index){
                console.log(`ohlc: recent[${first_dynamic_index-i}] = ${actor}`);
                recent[first_dynamic_index - i] = actor;
              }else{
                console.log(`ohlc: past[${i-last_static_index}] = ${actor}`);
                past[i - last_static_index] = actor;
              }  

            }//for-loop
        
            // diagnostics - tmp
            console.log(`ohlc: - past:`);
            console.dir(past);
            console.log(`ohlc - recent:`);
            console.dir(recent);
           
            resolve({past:past, recent:recent});

          }catch(e){
            reject(e);
          }
        });//promise

        return promise;

  }//create
};
