// grid.ts
// NOTE: seems to only scale in x-coord (not y?!)
export var Grid = {
  create: (options:any = {
    size: 400, 
    divisions:100, 
    centerLineColor: 0x0000ff, 
    gridColor: 0x808080, 
    x: 0, 
    y: 0, 
    z: 0 }):Promise<THREE.GridHelper> => {

      console.log(`grid.create() options= `);
      console.dir(options);

      var promise = new Promise((resolve, reject) => {

        try{
          var grid = new THREE.GridHelper(options['size'], options['divisions'], options['centerLineColor'], options['gridColor']);
          grid.position.x = options['x'];
          grid.position.y = options['y'];
          grid.position.z = options['z'];
          grid.rotateX(Math.PI/2.0);

          // add scale function - LATER send vec3 <sx,sy,sz> as attribute to GPU
          grid['_scale'] = (sx:number=1.0,sy:number=1.0,sz:number=1.0):void => {
            console.log(`scale: sx=${sx} sy=${sy} sz=${sz}`);
          };

          resolve(grid);
        }catch(e){
          reject(e);
        }
      });
      return promise;
    }
};
