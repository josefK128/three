// line.ts
export var Line = {
  create: (options:object):Promise<THREE.Line> => {

    console.log(`line.create() options= `);
    console.dir(options);

    var line_g:THREE.BufferGeometry,
        subset:number[] = [],
        vertices:Float32Array = new Float32Array(3*options['xpositions'].length),
        //vertices:Float32Array = new Float32Array(3*10),
        nvertices:number = vertices.length,
        xpositions:number[] = options['xpositions'],
        nxpositions:number = xpositions.length,
        data:number[] = options['data'],
        line_m:THREE.LineBasicMaterial,
        color:string = options['color'] || 'red',
        linewidth:number = options['linewidth'] || 5,
        line:THREE.Line,
        k:number = 3,                          // default is close 'C'
        promise = new Promise((resolve, reject) => {

          try{
            line_g = new THREE.BufferGeometry();
            line_m = new THREE.LineBasicMaterial({color:color, linewidth:linewidth, visible:true});

            // extract Op|H|L|C from options.data
            if(options['subset'] === 'Op'){
              k = 0;
            }              
            if(options['subset'] === 'H'){
              k = 1;
            }              
            if(options['subset'] === 'L'){
              k = 2;
            }              
            if(options['subset'] === 'C'){
              k = 3;
            }
            console.log(`options['subset'] = ${options['subset']} k = ${k}`);
            // subset - y-values
            for(let i=0; i<data.length; i++){
              let j = Math.floor(i/4.0);
              if(i%4 === k){
                subset[j] = data[i];
                console.log(`subset[${j}] = ${subset[j]}`);
              }
            }


            // vertices values
            console.log(`nvertices = ${nvertices}`);
            console.log(`subset.length = ${subset.length}`);
            console.log(`nxpositions = ${nxpositions}`);
            for(let i=0; i<nxpositions; i++){
              vertices[3*i] = xpositions[i];
              //console.log(`vertices[${3*i}] = ${vertices[3*i]}`);
              vertices[3*i+1] = subset[i];
              vertices[3*i+2] = 0.0;
            }

            // diagnostic
            for(let i=0; i<15; i++){
              console.log(`vertices[${i}] = ${vertices[i]}`);
            }


            // create custom attribute for BufferGeometry
            // (x,y,z) => 3 vertices per point
            line_g.addAttribute('position', new THREE.BufferAttribute(vertices,3));
            console.log(`line_g.attribute`);

            // set rendering set
            line_g.setDrawRange(0, subset.length);

            // create line
            line = new THREE.Line(line_g,line_m);
            line.visible = true;
            console.log(`line`);
            line.geometry.attributes.position.needsUpdate = true;
            console.log(`line_g.attributes.needsUpdate = true`);

            resolve(line);
          }catch(e){
            reject(e);
          }
        });
        return promise;
  }//create
};
