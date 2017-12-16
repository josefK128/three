// quad.ts

// shaders
import {vsh} from '../shaders/vsh_vertices.glsl';
import {fsh} from '../shaders/fsh_color.glsl';
import {uniforms} from '../shaders/fsh_color.glsl';


// closure var
var quad:THREE.Mesh,
    count:number = 0,
    flag:boolean = true;


export var Quad = {
  create: (options:any = {
    width:2, 
    height:2,
    x:0.0,
    y:0.0,
    z:0.0,
    color: new THREE.Color(0x0000ff),   // blue 
  }):Promise<THREE.Mesh> => {

    console.log(`quad.create() options= `);
    console.dir(options);

    var quad_g:THREE.BufferGeometry,
        quad_m:THREE.Material,
        vertex:THREE.Vector3 = new THREE.Vector3(),
        vertices:Float32Array = new Float32Array( [
	  -1.0, -1.0,  -0.1,
          1.0, -1.0,  -0.1,
          1.0,  1.0,  -0.1,
          1.0,  1.0,  -0.1,
          -1.0,  1.0,  -0.1,
          -1.0, -1.0,  -0.1
        ] ),
        promise:Promise<THREE.Mesh> = new Promise((resolve, reject) => {

          try{
            // quad geometry
            quad_g = new THREE.BufferGeometry();
            quad_g.addAttribute('position', new THREE.BufferAttribute(vertices,3));
  
            // quad material
             quad_m = new THREE.MeshBasicMaterial({color: options.color, side: THREE.DoubleSide}); 
  //            quad_m = new THREE.ShaderMaterial({  
  //            uniforms:uniforms,
  //            vertexShader: vsh,
  //            fragmentShader: fsh
  //          });
  
            // quad Mesh
            quad = new THREE.Mesh(quad_g, quad_m);
            quad.position.x = options.x;
            quad.position.y = options.y;
            quad.position.z = options.z;
  
            // add scale function - LATER send vec3 <sx,sy,sz> as attribute to GPU
            quad['_scale'] = (sx:number=1.0,sy:number=1.0,sz:number=1.0):void => {
              console.log(`scale: sx=${sx} sy=${sy} sz=${sz}`);
            };
  
            // add quad render function called by graphics service each frame
            quad['render'] = (options:any = {color:0x00ff00}):void => {
              if(count++ % 1000 === 1){
                if(flag = !flag){
                  quad_m.color = new THREE.Color(0x00ff00); 
                  quad.geometry.attributes.position.array = new Float32Array( [
            	    -3.0, -5.0,  -0.1,
            	    3.0, -5.0,  -0.1,
                    3.0,  5.0,  -0.1,
                    3.0,  5.0,  -0.1,
                    -3.0,  5.0,  -0.1,
            	    -3.0, -5.0,  -0.1
                  ]);
                }else{
                  quad_m.color = new THREE.Color(0xff0000); 
                  quad.geometry.attributes.position.array = new Float32Array( [
            	    -5.0, -3.0,  -0.1,
            	    5.0, -3.0,  -0.1,
                    5.0,  3.0,  -0.1,
                    5.0,  3.0,  -0.1,
                    -5.0,  3.0,  -0.1,
            	    -5.0, -3.0,  -0.1
                  ]);
                }
                quad.geometry.attributes.position.needsUpdate = true;
              }
            };
  
            resolve(quad);
          }catch(e){
            reject(e);
          }
      });//promise
      return promise;     
    }//create()

};//Quad
