// line.ts
export var Line = {
  create: (options:any = {
    max_vertices: 200, 
    drawCount:3, 
    color: 0xff0000, 
    lineWidth: 2, 
    z:-1.0, // layer2 (layer0 is grid z=0, layer1 is quads z=-0.5)
    vertices: [0,0,0, -1,2,0, -2,0,0,]
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
            line_m = new THREE.LineBasicMaterial(options.color, options.lineWidth);

            // create custom attribute for BufferGeometry
            // (x,y,z) => 3 vertices per point
            positions = new Float32Array(options.max_vertices*3); 
            line_g.addAttribute('position', new THREE.BufferAttribute(positions,3));

            // set rendering set
            drawCount = options.drawCount;
            line_g.setDrawRange(0, drawCount);

            // create line
            line = new THREE.Line(line_g,line_m);

            // place on correct layer
            line.position.z = options.z;

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

            // add line render function called by graphics service each frame
            line['render'] = (options:any = {color:0x00ff00}):void => {
              if(count++ % 1000 === 1){
                if(flag = !flag){
                  line_m.color = new THREE.Color(0x00ff00); 
                }else{
                  line_m.color = new THREE.Color(0xff0000); 
                }
              }
            };

            resolve(line);
          }catch(e){
            reject(e);
          }
        });
        return promise;
  }//create
};
