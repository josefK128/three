// ohlc.ts
// optimized to return actor itself ad NOT promise

export var Ohlc = {

  // create ohlc-bar actor - options data values o,h,l,c
  create: (depth:number, ohlca:number[]) => {
  var actor = new THREE.Group(),
      // first bar glyph
      open = ohlca[0],
      high = ohlca[1],
      low = ohlca[2],
      close = ohlca[3],

      // values derived from open, high, low and close
      dhl = Math.max(high-low, 1.0),
      yhl = (high + low)*0.5,
      glyph_color = open > close ? 'red' : 'green',

      // actor - three components
      // [1] quad: high-low
      quad_g,
      quad_m,
      quad,

      // [2a] pointO: opening
      vertices,
      pointO_g,
      pointO_m,
      pointO,

      // [2b] pointC: close
      pointC_g,
      pointC_m,
      pointC;
  
  
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

    return {past:[], recent:[actor]};

  }//create
};
