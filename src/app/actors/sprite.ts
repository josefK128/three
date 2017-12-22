// sprite.ts
// sprite is texture-mapped char/numeral symbol

export var Sprite = {
  create: (options:any={x:0,y:4.0,z:0.0, sx:1,sy:1}):Promise<THREE.Line> => {
        
    console.log(`sprite.create() options= `);
    console.dir(options);
  
    var sprite_m:THREE.SpriteMaterial,
        sprite:THREE.Sprite,
        opacity = options['opacity'] || 1.0,
        promise = new Promise((resolve, reject) => {
          try{
            (new THREE.TextureLoader()).load('./assets/images/sprite_redlight.png', (texture) => { 
              console.log(`&&& texture = ${texture}`);
              sprite_m = new THREE.SpriteMaterial({
                map: texture,
                color: 0xffffff            
              });
              sprite = new THREE.Sprite(sprite_m);
    
              // scale sprite
              sprite.scale.set(options.sx, options.sy, 1);
    
              // translate to world coords
              sprite.position.set(options.x, options.y, options.z);          
          
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
