// candle.ts
// optimized to create all candle-glyphs in one create call
// returns promise resolving an object containing the two time-ray arrays
// 'past' which are static glyphs pointing into the past and whose 0th element 
// is the glyph representing data[options.first_dynamic_index + 1], and
// 'recent' which are dynamic glyph(s) pointing in the future direction and
// whose 0th element is the glyph represented by data[first_dynamic_index]
//
// arguments to create are:
// depth:number - z-depth at which to create the set of glyphs
//  depth = -layer * config.layerDepth
// layer:number - index of layer which is the parent THREE.Group of glyph set
// options:object containing
//   first_dynamic_index:number (see above)
//   width:number - width of the 2 smaller top and bottom quads quadH and quadL
//     NOTE: the width of the central quadOC is then 2*width
//   xpositions:number[] - glyph.x position of the glyph on the x 'time' axis
//   data:number[] - sequence of open, high, low, close y-values for each glyph
//
// kth candle glyph is a central quad 'quad' of width 2*width and centered at
//   (open+close)/2
// located at (xposition[k], (high-low)/2)
// The kth (top) high quad 'quadH' has width = 'width' and is centered at 
//   (high+max(open,close))/2 
// The kth (bottom) low quad 'quadL' has width = 'width' and is centered at 
//   (low+min(open,close))/2
// NOTE: all glyphs are constructed at the origin (local coordinates) and
//   the kth glyphs are translated in the negative-x direction by xpositions[k]


export var Candle = {

  // create candle actors 
  create: (depth:number, layer:THREE.Group, options:object):Promise<object> => {

    console.log(`candle.create() depth=${depth} layer=${layer} options= `);
    console.dir(options);
    console.log(`options['data'].length = ${options['data'].length/4}`);
    
    var symbol:string = options['symbol'],
        nglyphs:number = options['data'].length/4,
        first_dynamic_index:number = options['first_dynamic_index'],
        width:number = options['width'],
        xpositions:number[] = options['xpositions'],
        data:number[] = options['data'],

        // constants needed in each iteration loop
        // glyph={quad,quadO,quadC} is set behind possible grid on same layer
        // 'arm' components (quadO,quadC} are set behind quad to avoid
        // possible 'depth-flickering' of overlapping planes at identical depth
        doublewidth:number = 2.0*width,
        quad_depth:number = depth-0.01,

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
        center:number,
        centerH:number,
        centerL:number,
        heightH:number,
        heightL:number,
        doc:number,     // delta-open-close (O>=C)  delta-close-open (C>O

        // additional properties
        doubleWidth:number,    // 2*width
        glyph_color:string,
  
        // actor - three components
        // [1] quad: open-close
        quad_g:THREE.PlaneBuffergeometry,
        quad_m:THREE.Material,
        quad:THREE.Mesh,
  
        // [2a] quadH: top 'high' quad
        vertices:Float32Array,
        quadH_g:THREE.PlaneBufferGeometry,
        quadH_m:THREE.Material,
        quadH:THREE.Mesh,
  
        // [2b] quadL: bottom low quad
        quadL_g:THREE.PlaneBufferGeometry,
        quadL_m:THREE.Material,
        quadL:THREE.Mesh,

        promise = new Promise((resolve, reject) => {
          try{
            // glyph construction iteration
            for(let i=0; i<nglyphs; i++){
              actor = new THREE.Group();
              open = data[4*i];
              high = data[4*i + 1];
              low = data[4*i + 2];
              close = data[4*i + 3];
        
              // y-center values derived from open, high, low and close
              center = 0.5*(open+close);
              centerH = 0.5*(high + Math.max(open, close));
              centerL = 0.5*(low + Math.min(open, close));
              doc = (open > close) ? Math.max(1.0, (open-close)) : Math.max(1.0, (close-open));
              glyph_color = open > close ? 'red' : 'green';
        
              // three components:
              // [1] quad: high-low
              // NOTE: quad.position.x = 0 by default
              quad_g = new THREE.PlaneBufferGeometry(doublewidth, doc);
              quad_m = new THREE.MeshBasicMaterial({color:glyph_color, transparent:false});
              quad = new THREE.Mesh(quad_g, quad_m);
              quad.position.y = center;
              quad.position.z = quad_depth;
              actor.add(quad);
              
              // [2a] quadH: top high quad
              heightH = high - Math.max(open,close);
              heightH = Math.max(heightH, 1.0);   // for visibility
              quadH_g = new THREE.PlaneBufferGeometry(width, heightH);
              quadH_m = new THREE.MeshBasicMaterial( {color:glyph_color, transparent:false} );
              quadH = new THREE.Mesh(quadH_g, quadH_m);
              quadH.position.y = centerH;
              quadH.position.z = quad_depth;
              actor.add( quadH );       
            
              // [2b] quadL: bottom low quad
              heightL = Math.min(open,close) - low;
              quadL_g = new THREE.PlaneBufferGeometry(width, heightL);
              quadL_m = new THREE.MeshBasicMaterial( {color:glyph_color, transparent:false} );
              quadL = new THREE.Mesh(quadL_g, quadL_m);
              quadL.position.y = centerL;
              quadL.position.z = quad_depth;
              actor.add( quadL );  
        
        
              // set position.x from xpositions array and add to layer
              actor.position.x = xpositions[i];
              actor.name = `${symbol}${i}`;
              //console.log(`actor.name = ${actor.name} add to layer[${layer}]`);
              layer.add(actor);
        
              // add to static 'past' or dynamic 'recent' arrays of actors(THREE.Group)
              //console.log(`candle for-loop: i = ${i}`);
              //console.log(`actor[${i}].position.x = ${actor.position.x}`);
              if(i <= first_dynamic_index){
                //console.log(`candle: recent[${first_dynamic_index-i}] = ${actor}`);
                recent[first_dynamic_index - i] = actor;
              }else{
                //console.log(`candle: past[${i-last_static_index}] = ${actor}`);
                past[i - last_static_index] = actor;
              }  

            }//for-loop
        
            resolve({past:past, recent:recent});

          }catch(e){
            reject(e);
          }
        });//promise

        return promise;

  }//create
};
