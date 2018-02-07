// line.ts
export var Line = {
  create: (options:object):Promise<THREE.Group> => {

    console.log(`line.create() options= `);
    console.dir(options);

    var group:THREE.Group = new THREE.Group(),

        // line with 'thickness'
        line_g:THREE.BufferGeometry,
        line_m:THREE.LineBasicMaterial,
        line:THREE.Line,
        lineA_g:THREE.BufferGeometry,
        lineA_m:THREE.LineBasicMaterial,
        lineA:THREE.Line,
        lineB_g:THREE.BufferGeometry,
        lineB_m:THREE.LineBasicMaterial,
        lineB:THREE.Line,
        vertices:Float32Array = new Float32Array(3*options['xpositions'].length),
        verticesA:Float32Array = new Float32Array(3*options['xpositions'].length),
        verticesB:Float32Array = new Float32Array(3*options['xpositions'].length),
        linecolor:string = options['linecolor'] || 'blue',
        linewidth:number = options['linewidth'] || 4,
        linewidthD2:number = 0.5*linewidth,

        // border
        borderA_g:THREE.BufferGeometry,
        borderA_m:THREE.LineBasicMaterial,
        borderA:THREE.Line,
        borderB_g:THREE.BufferGeometry,
        borderB_m:THREE.LineBasicMaterial,
        borderB:THREE.Line,
        verticesbA:Float32Array = new Float32Array(3*options['xpositions'].length),
        verticesbB:Float32Array = new Float32Array(3*options['xpositions'].length),
        bordercolor:string = options['bordercolor'] || 'red',
        borderwidth:number = options['borderwidth'] || 6,
        borderwidthD2:number = 0.5*borderwidth,

        subset:number[] = [],
        nvertices:number = vertices.length,
        xpositions:number[] = options['xpositions'],
        nxpositions:number = xpositions.length,
        data:number[] = options['data'],
        k:number = 3,                          // default is close 'C'
        promise = new Promise((resolve, reject) => {

          try{
            line_g = new THREE.BufferGeometry();
            line_m = new THREE.LineBasicMaterial({color:linecolor, visible:true});
            lineA_g = new THREE.BufferGeometry();
            lineA_m = new THREE.LineBasicMaterial({color:linecolor, visible:true});
            lineB_g = new THREE.BufferGeometry();
            lineB_m = new THREE.LineBasicMaterial({color:linecolor, visible:true});

            borderA_g = new THREE.BufferGeometry();
            borderA_m = new THREE.LineBasicMaterial({color:bordercolor, visible:true});
            borderB_g = new THREE.BufferGeometry();
            borderB_m = new THREE.LineBasicMaterial({color:bordercolor, visible:true});


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
//              console.log(`subset[${j}] = ${subset[j]}`);
              }
            }


            // vertices values
            console.log(`nvertices = ${nvertices}`);
            console.log(`subset.length = ${subset.length}`);
            console.log(`nxpositions = ${nxpositions}`);
            for(let i=0; i<nxpositions; i++){
              vertices[3*i] = xpositions[i];
              vertices[3*i+1] = subset[i];
              vertices[3*i+2] = 0.0;

              if(linewidth > 0){
                verticesA[3*i] = xpositions[i];
                verticesA[3*i+1] = subset[i] + linewidthD2;
                verticesA[3*i+2] = 0.0;
                verticesB[3*i] = xpositions[i];
                verticesB[3*i+1] = subset[i] - linewidthD2;
                verticesB[3*i+2] = 0.0;
              }

              if(borderwidth > 0){
                verticesbA[3*i] = xpositions[i];
                verticesbA[3*i+1] = subset[i] + borderwidthD2;
                verticesbA[3*i+2] = 0.0;
                verticesbB[3*i] = xpositions[i];
                verticesbB[3*i+1] = subset[i] - borderwidthD2;
                verticesbB[3*i+2] = 0.0;
              }
            }


            // create custom attribute for BufferGeometry
            // (x,y,z) => 3 vertices per point
            line_g.addAttribute('position', new THREE.BufferAttribute(vertices,3));

            // set rendering set
            line_g.setDrawRange(0, subset.length);

            // create line
            line = new THREE.Line(line_g,line_m);
            line.visible = true;
            console.log(`line`);
            line.geometry.attributes.position.needsUpdate = true;
            console.log(`line_g.attributes.needsUpdate = true`);
            group.add(line);

            // lineA and lineB
            if(linewidth > 0){
              lineA_g.addAttribute('position', new THREE.BufferAttribute(verticesA,3));
              lineB_g.addAttribute('position', new THREE.BufferAttribute(verticesB,3));
              lineA_g.setDrawRange(0, subset.length);
              lineB_g.setDrawRange(0, subset.length);

              // create lineA
              lineA = new THREE.Line(lineA_g,lineA_m);
              lineA.visible = true;
              console.log(`lineA`);
              lineA.geometry.attributes.position.needsUpdate = true;
              console.log(`lineA_g.attributes.needsUpdate = true`);
  
              // create lineB
              lineB = new THREE.Line(lineB_g,lineB_m);
              lineB.visible = true;
              console.log(`lineB`);
              lineB.geometry.attributes.position.needsUpdate = true;
              console.log(`lineB_g.attributes.needsUpdate = true`);
  
              group.add(lineA);
              group.add(lineB);
            }

            // borderA and borderB
            if(borderwidth > 0){
              borderA_g.addAttribute('position', new THREE.BufferAttribute(verticesbA,3));
              borderB_g.addAttribute('position', new THREE.BufferAttribute(verticesbB,3));
              borderA_g.setDrawRange(0, subset.length);
              borderB_g.setDrawRange(0, subset.length);

              // create borderA
              borderA = new THREE.Line(borderA_g,borderA_m);
              borderA.visible = true;
              console.log(`borderA`);
              borderA.geometry.attributes.position.needsUpdate = true;
              console.log(`borderA_g.attributes.needsUpdate = true`);
  
              // create borderB
              borderB = new THREE.Line(borderB_g,borderB_m);
              borderB.visible = true;
              console.log(`borderB`);
              borderB.geometry.attributes.position.needsUpdate = true;
              console.log(`borderB_g.attributes.needsUpdate = true`);
  
              group.add(borderA);
              group.add(borderB);
            }


            resolve(group);
          }catch(e){
            reject(e);
          }
        });
        return promise;
  }//create
};
