// ohlc.ts
// optimized to return actor itself ad NOT promise

export var Ohlc = {

  // create ohlc-bar actor - options data values o,h,l,c
  create: (depth:number, layer:THREE.Group, options:object):Promise<object> => {

    console.log(`ohlc.create() depth=${depth} layer=${layer} options= `);
    console.dir(options);
    
    var nglyphs = options['data'].length/4,
        first_dynamic_index:number = options['first_dynamic_index'],
        last_static_index:number = first_dynamic_index + 1,
        xpositions:number[] = options['xpositions'],
        data:number[] = options['data'],
        past:THREE.Group[] = [],
        recent:THREE.Group[] = [],

        // iterations placeholders for glyph construction
        actor:THREE.Group, 
        open:number,
        high:number,
        low:number,
        close:number,
  
        // values derived from open, high, low and close
        dhl:number,
        yhl:number,
        glyph_color:string,
  
        // actor - three components
        // [1] quad: high-low
        quad_g:THREE.PlaneBuffergeometry,
        quad_m:THREE.Material,
        quad:THREE.Mesh,
  
        // [2a] pointO: opening
        vertices:Float32Array,
        pointO_g:THREE.BufferGeometry,
        pointO_m:THREE.PointsMaterial,
        pointO:THREE.Point,
  
        // [2b] pointC: close
        pointC_g:THREE.BufferGeometry,
        pointC_m:THREE.PointsMaterial,
        pointC:THREE.Point,

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
              quad_g = new THREE.PlaneBufferGeometry(0.2, dhl);
              quad_m = new THREE.MeshBasicMaterial({color:glyph_color, transparent:false});
              quad = new THREE.Mesh(quad_g, quad_m);
              quad.position.y = yhl;
              quad.position.z = depth-0.01;
              actor.add(quad);
              
              // [2a] pointO: open
              pointO_g = new THREE.BufferGeometry();
              vertices = new Float32Array( [
                 -0.1, open, depth-0.02
              ] );
              pointO_g.addAttribute('position', new THREE.BufferAttribute(vertices,3));
              //pointO_g.vertices.push(new THREE.Vector3( 0, 0, 0)); // THREE.Geometry
              pointO_m = new THREE.PointsMaterial( {size: 0.2, color:glyph_color,
                  transparent:false, sizeAttenuation:true} );
              pointO = new THREE.Points( pointO_g, pointO_m );
              actor.add( pointO );       
            
              // [2b] pointC: close
              pointC_g = new THREE.BufferGeometry();
              vertices = new Float32Array( [
                 0.1, close, depth-0.02
              ] );
              pointC_g.addAttribute('position', new THREE.BufferAttribute(vertices,3));
              //pointC_g.vertices.push(new THREE.Vector3( 0, 0, 0)); // THREE.Geometry
              pointC_m = new THREE.PointsMaterial( {size: 0.2, color:glyph_color,
                  transparent:false, sizeAttenuation:true} );
              pointC = new THREE.Points( pointC_g, pointC_m );
              actor.add( pointC );  
        
        
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
