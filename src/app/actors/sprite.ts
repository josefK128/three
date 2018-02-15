// sprite.ts
// sprite is texture-mapped char/numeral symbol

export var Sprite = {
  create: (options:any={x:-100,y:120.0,z:0.0, sx:10,sy:20}):Promise<THREE.Sprite> => {
        
    console.log(`\n\n &&& sprite.create() options= `);
    console.dir(options);
  
    var sprite_m:THREE.SpriteMaterial,
        sprite:THREE.Sprite,
        loader:THREE.TextureLoader = new THREE.TextureLoader(),
        texture:THREE.Texture,
        opacity = options['opacity'] || 1.0;
        return new Promise((resolve, reject) => {
          try{
            // loader.load('http://tosca:8080/webgl/three/src/assets/images/sprite_redlight.png', (texture) => { 
            texture = loader.load('./assets/images/three.png'); 
              console.log(`\n\n &&& texture = ${texture}`);
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
              console.log(`\n\n &&& resolve sprite = ${sprite}`);
              resolve(sprite);
            //}); 
          }catch(e){
            console.log(`\n\n &&& error ${e} loading texture`);
            reject(e);
          }
        });//promise
  }//create
};
