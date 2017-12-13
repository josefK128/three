// line.ts
export var Line = {
  create: (options:any = {
    max_vertices: 900, 
    drawCount:3, 
    color: 0xff0000, 
    lineWidth: 2, 
    vertices: [0,0,0, -2,16,0, -4,0,0,]
  }):Promise<THREE.Line> => {

    console.log(`line.create() options= `);
    console.dir(options);

    var g:THREE.BufferGeometry,
        m:THREE.LineBasicMaterial,
        positions:Float32Array,
        drawCount:number,
        line:THREE.Line,
        promise = new Promise((resolve, reject) => {

          try{
            g = new THREE.BufferGeometry();
            m = new THREE.LineBasicMaterial(options.color, options.lineWidth);

            // create custom attribute for BufferGeometry
            // (x,y,z) => 3 vertices per point
            positions = new Float32Array(options.max_vertices*3); 
            g.addAttribute('position', new THREE.BufferAttribute(positions,3));

            // set rendering set
            drawCount = options.drawCount;
            g.setDrawRange(0, drawCount);

            // create line
            line = new THREE.Line(g,m);

            // assign positions the attribute 'position'
            positions = line.geometry.attributes.position.array;
            for(let i=0; i<options.vertices.length; i++){
              positions[i] = options.vertices[i];
            }
            for(let i=options.vertices.length; i<options.max_vertices*3;){
              positions[i++] = -2*i;
              positions[i++] = 64.0*Math.random();
              positions[i++] = 0.0;
            }
            line.geometry.attributes.position.needsUpdate = true;

            // scale function - LATER send vec3 <sx,sy,sz> as attribute to GPU
            line['_scale'] = (sx:number=1.0,sy:number=1.0,sz:number=1.0):void =>            {
              console.log(`scale: sx=${sx} sy=${sy} sz=${sz}`);
            };
  
            resolve(line);
          }catch(e){
            reject(e);
          }
        });
        return promise;
    }
};
