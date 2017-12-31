// axes.ts
// axes is RH-coord system 3D axes

export var Axes = {
  create: (options:any={size:1}):Promise<THREE.AxesHelper> => {
        
    console.log(`axes.create() options= `);
    console.dir(options);
  
    var axes:THREE.AxesHelper,
        promise = new Promise((resolve, reject) => {
          try{
            axes = new THREE.AxesHelper(options['size']);
                
            // return actor ready to be added to scene
            resolve(axes);
          }catch(e){
            reject(e);
          }
        });//promise
        return promise;
  }//create
};
