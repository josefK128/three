// study.ts
export var Study = {
  create: (options:any = {
    max_vertices: 200, 
    drawCount:200, 
    color: 0xff0000, 
    linewidth: 30, 
    vertices: [0,0,0, -10,80,0, -15,40,0]
  }):Promise<THREE.Line> => {

    console.log(`study.create() options= `);
    console.dir(options);

    var study_g:THREE.BufferGeometry,
        study_m:THREE.LineBasicMaterial,
        positions:Float32Array,
        drawCount:number,
        study:THREE.Line,
        count:number = 0,
        flag:boolean = true,
        promise = new Promise((resolve, reject) => {

          try{
            study_g = new THREE.BufferGeometry();
            study_m = new THREE.LineBasicMaterial({color:options.color, 
              linewidth:options.linewidth});

            // create custom attribute for BufferGeometry
            // (x,y,z) => 3 vertices per point
            positions = new Float32Array(options.max_vertices*3); 
            study_g.addAttribute('position', new THREE.BufferAttribute(positions,3));

            // set rendering set
            drawCount = options.drawCount;
            study_g.setDrawRange(0, drawCount);

            // create study
            study = new THREE.Line(study_g,study_m);

            // assign positions the attribute 'position'
            positions = study.geometry.attributes.position.array;
            for(let i=0; i<options.vertices.length; i++){
              positions[i] = options.vertices[i];
            }
            for(let i=options.vertices.length; i<3*options.max_vertices; i++){
            if(i%3 === 0){positions[i] = -10*(i/3);}
              if(i%3 === 1){positions[i] =  100.0*Math.random();}
              if(i%3 === 2){positions[i] = 0.0;}
            }
            study.geometry.attributes.position.needsUpdate = true;

            resolve(study);
          }catch(e){
            reject(e);
          }
        });
        return promise;
  }//create
};
