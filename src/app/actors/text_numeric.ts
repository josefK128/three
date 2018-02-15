// text_numeric.ts
// text_numeric is BufferGeometry char/numeral symbol

export var TextNumeric = {
  create: (options:any={
                text: 'A',
                x: -10,
                y: 10,
		font: 'fonts/helvetiker_regular.typeface.json',
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelSegments: 5
  }):Promise<THREE.TextBufferGeometry> => {

    console.log(`text_numeric.create() options= `);
    console.dir(options);
  
    var text_numeric:THREE.TextBufferGeometry,
        text:string = options['text'],
        loader:THREE.FontLoader = new THREE.FontLoader(),
        font:Font;
        return new Promise((resolve, reject) => {
          try{
            font = loader.load(options['font']);
            console.log(`&&& font = ${font}`);
            text_numeric = new THREE.TextBufferGeometry(text,options);

            // position
            text_numeric.position.x = options['x'];
            text_numeric.position.y = options['y'];
    
            // return actor ready to be added to scene
            console.log(`resoving text_numeric = ${text_numeric}`);
            resolve(text_numeric);
          }catch(e){
            reject(e);
          }
        });//promise
  }//create
};
