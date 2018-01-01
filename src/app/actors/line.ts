// line.ts
export var Line = {
  create: (options:any = {
    max_vertices: 200, 
    drawCount:200, 
    color: 0xff0000, 
    linewidth: 30, 
    vertices: [0,0,0, -3,4,0, -6,1,0]
  }):Promise<THREE.Line> => {

    console.log(`line.create() options= `);
    console.dir(options);

    var line_g:THREE.BufferGeometry,
        line_m:THREE.LineBasicMaterial,
        positions:Float32Array,
        drawCount:number,
        line:THREE.Line,
        count:number = 0,
        flag:boolean = true,
        promise = new Promise((resolve, reject) => {

          try{
            line_g = new THREE.BufferGeometry();
            line_m = new THREE.LineBasicMaterial({color:options.color, 
              linewidth:options.linewidth});

            // create custom attribute for BufferGeometry
            // (x,y,z) => 3 vertices per point
            positions = new Float32Array(options.max_vertices*3); 
            line_g.addAttribute('position', new THREE.BufferAttribute(positions,3));

            // set rendering set
            drawCount = options.drawCount;
            line_g.setDrawRange(0, drawCount);

            // create line
            line = new THREE.Line(line_g,line_m);

            // assign positions the attribute 'position'
            positions = line.geometry.attributes.position.array;
            for(let i=0; i<options.vertices.length; i++){
              positions[i] = options.vertices[i];
            }
            for(let i=options.vertices.length; i<options.max_vertices*3;){
              positions[i++] = -i;
              positions[i++] = 8.0*Math.random();
              positions[i++] = 0.0;
            }
            line.geometry.attributes.position.needsUpdate = true;

            resolve(line);
          }catch(e){
            reject(e);
          }
        });
        return promise;
  }//create
};
