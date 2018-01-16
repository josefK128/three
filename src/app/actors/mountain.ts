// mountain.ts
export var Mountain = {
  create: (options:object):Promise<THREE.Line> => {

    console.log(`line.create() options= `);
    console.dir(options);

    var shape:THREE.Shape = new THREE.Shape(),
        mountain_g:THREE.ShapeBufferGeometry,
        mountain_m:THREE.MeshBasicMaterial,
        mountain:THREE.Mesh,    
        subset:number[] = [],
        vertices:Float32Array = new Float32Array(3*options['xpositions'].length),
        nvertices:number = vertices.length,
        xpositions:number[] = options['xpositions'],
        nxpositions:number = xpositions.length,
        data:number[] = options['data'],
        color:string = options['color'] || 'yellow',
        k:number = 3,                          // default is close 'C'
        promise = new Promise((resolve, reject) => {

          try{
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
              //console.log(`vertices[${3*i}] = ${vertices[3*i]}`);
              vertices[3*i+1] = subset[i];
              vertices[3*i+2] = 0.0;
            }

            // check for NaN
//            for(let i=0,flag=true; i<nvertices; i++){
//              //console.log(`vertices[${i}] = ${vertices[i]}`);
//              if(flag){
//                if(Number.isNaN(vertices[i])){
//                  console.log(`vertices[${i}] is NaN!!!!!!!!!`);
//                  flag = false;
//                }
//              }
//            }


            // create mountain
            shape.moveTo(0,0);
            for(let i=0; i<nxpositions; i++){
              shape.lineTo(xpositions[i], subset[i]);
            }
            shape.lineTo(xpositions[nxpositions-1], 0);
            shape.lineTo(0,0);

            mountain_g = new THREE.ShapeBufferGeometry(shape);
            mountain_m = new THREE.MeshBasicMaterial({color:color, transparent:true, opacity:0.4});
            mountain = new THREE.Mesh(mountain_g, mountain_m);

            resolve(mountain);
          }catch(e){
            reject(e);
          }
        });
        return promise;
  }//create
};
