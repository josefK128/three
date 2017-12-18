// sprite.ts


export var Sprite = {
  create: (options:any={x:0,y:6,z:-1.5, sx:100,sy:200}):Promise<THREE.Line> => {
        
    console.log(`sprite.create() options= `);
    console.dir(options);
  
    var sprite_m:THREE.SpriteMaterial,
        sprite:THREE.Sprite,
        opacity = options['opacity'] || 1.0,
        promise = new Promise((resolve, reject) => {
          try{
            (new THREE.TextureLoader()).load('./assets/images/sprite_quantum.png', (texture) => { 
              console.log(`&&& texture = ${texture}`);
              sprite_m = new THREE.SpriteMaterial({
                map: texture,
                color: 0xffffff            
              });
              sprite = new THREE.Sprite(sprite_m);
    
              // scale sprite
              sprite.scale.set(options.sx, options.sy, 1);
    
              sprite.position.x = options.x;
              sprite.position.y = options.y;
              sprite.position.z = options.z;          
          
              // return actor ready to be added to scene
              resolve(sprite);
            }); 
          }catch(e){
            reject(e);
          }
        });//promise
        return promise;
  }//create
};
