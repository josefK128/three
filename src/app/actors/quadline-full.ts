// quadline.ts
export var QuadLine = {
  create: (options:object):Promise<THREE.Mesh> => {

    console.log(`quadline.create() options= `);
    console.dir(options);

    var line_g:THREE.Geometry,
        line_m:THREE.MeshBasicMaterial,
        line:THREE.Mesh,
        border_g:THREE.Geometry,
        border_m:THREE.MeshBasicMaterial,
        border:THREE.Mesh,
        linewidth:number = options['linewidth'] || 6,
        borderwidth:number = options['borderwidth'] || 10,
        linewidthD2:number = .5*linewidth,
        borderwidthD2:number = .5*borderwidth,
        lineZ:number = 0.0,
        borderZ:number = 0.001,
        lineColor:string = options['lineColor'] || 'red',
        borderColor:string = options['borderColor'] || 'green',

        subset:number[] = [],
        // 4 vertices per quad => 12 coordinates per quad
        lvertices:Float32Array = new Float32Array(6*options['xpositions'].length),
        bvertices:Float32Array = new Float32Array(6*options['xpositions'].length),
        xpositions:number[] = options['xpositions'],
        nxpositions:number = xpositions.length,
        data:number[] = options['data'],
        k:number = 3,                          // default is close 'C'
        promise = new Promise((resolve, reject) => {

          try{
            line_g = new THREE.Geometry();
            line_m = new THREE.MeshBasicMaterial({color:lineColor, visible:true});
            line_m.side = THREE.DoubleSide;
            border_g = new THREE.Geometry();
            border_m = new THREE.MeshBasicMaterial({color:borderColor, visible:true});
            border_m.side = THREE.DoubleSide;

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

            for(let i=0; i<nxpositions; i+=2){
              line_g.vertices.push(new THREE.Vector3(xpositions[i],subset[i]+linewidthD2,0.0));
              line_g.vertices.push(new THREE.Vector3(xpositions[i],subset[i]-linewidthD2,0.0));
              line_g.vertices.push(new THREE.Vector3(xpositions[i+1],subset[i+1]+linewidthD2,0.0));
              line_g.vertices.push(new THREE.Vector3(xpositions[i+1],subset[i+1]-linewidthD2,0.0));

              line_g.faces.push(0,1,2);
              line_g.faces.push(0,2,3);

              line_g.computeFaceNormals();
              line_g.computeVertexNormals();
            }

            // vertices values
            console.log(`subset.length = ${subset.length}`);
            console.log(`nxpositions = ${nxpositions}`);
//            for(let i=0; i<nxpositions; i+=2){
//              lvertices[6*i] = xpositions[i];
//              line_g.vertices.push(lvertices[6*i]);
//              lvertices[6*i+1] = subset[i] + linewidthD2;
//              line_g.vertices.push(lvertices[6*i+1]);
//              lvertices[6*i+2] = lineZ;
//              line_g.vertices.push(lvertices[6*i+2]);
//
//              lvertices[6*i+3] = xpositions[i];
//              line_g.vertices.push(lvertices[6*i+3]);
//              lvertices[6*i+4] = subset[i] - linewidthD2;
//              line_g.vertices.push(lvertices[6*i+4]);
//              lvertices[6*i+5] = lineZ;
//              line_g.vertices.push(lvertices[6*i+5]);
//
//
//              lvertices[6*i+6] = xpositions[i+1];
//              line_g.vertices.push(lvertices[6*i+6]);
//              lvertices[6*i+7] = subset[i+1] + linewidthD2;
//              line_g.vertices.push(lvertices[6*i+7]);
//              lvertices[6*i+8] = lineZ;
//              line_g.vertices.push(lvertices[6*i+8]);
//
//              lvertices[6*i+9] = xpositions[i+1];
//              line_g.vertices.push(lvertices[6*i+9]);
//              lvertices[6*i+10] = subset[i+1] - linewidthD2;
//              line_g.vertices.push(lvertices[6*i+10]);
//              lvertices[6*i+11] = lineZ;
//              line_g.vertices.push(lvertices[6*i+11]);
//            }


            // create custom attribute for BufferGeometry
            // (x,y,z) => 3 vertices per point
            //line_g.addAttribute('position', new THREE.BufferAttribute(lvertices,6));
            //console.log(`line_g.attribute`);

            // set rendering set
            //line_g.setDrawRange(0, subset.length);



            // create quadline mesh
            line = new THREE.Mesh(line_g,line_m);
            line.visible = true;
            console.log(`line:`);
            console.dir(line);
            //line.geometry.attributes.position.needsUpdate = true;
            //console.log(`line_g.attributes.needsUpdate = true`);

            resolve(line);
          }catch(e){
            reject(e);
          }
        });
        return promise;
  }//create
};
