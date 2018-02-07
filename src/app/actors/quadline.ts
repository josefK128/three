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
              console.log(`i = ${i}`);
              console.log(`xpositions[${i}] = ${xpositions[i]}`);
              console.log(`subset[${i}] = ${subset[i]}`);
              line_g.vertices.push(new THREE.Vector3(xpositions[i],subset[i]+linewidthD2,0.0));
              line_g.vertices.push(new THREE.Vector3(xpositions[i],subset[i]-linewidthD2,0.0));

              console.log(`xpositions[${i+1}] = ${xpositions[i+1]}`);
              console.log(`subset[${i+1}] = ${subset[i+1]}`);
              line_g.vertices.push(new THREE.Vector3(xpositions[i+1],subset[i+1]+linewidthD2,0.0));
              line_g.vertices.push(new THREE.Vector3(xpositions[i+1],subset[i+1]-linewidthD2,0.0));

              //console.log(`line_g = ${line_g}`);
              //line_g.faces.push(0,1,2);
              //line_g.faces.push(2,3,0);

              //line_g.computeFaceNormals();
              //line_g.computeVertexNormals();
              //console.log(`line_g = ${line_g}`);
              //console.log(`i = ${i}`);
            }


            // create quadline mesh
            console.log(`@@@@ line_g = ${line_g}`);
            line = new THREE.Mesh(line_g,line_m);
            console.log(`@@@@ line = ${line}`);
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
