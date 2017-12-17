// quad.ts
// NOTE: grid layer is at z=0
// NOTE: z-layering => perspective scale by (camera.z - quad.z)/camera.z 
// exp: suppose camera.z = 10, quad.z = -0.1 (layers are spaced by 0.1)
//      Then must scale quad by (10+0.1)/10 = 1.01

// shaders
import {vsh} from '../shaders/vsh_vertices.glsl';
import {fsh} from '../shaders/fsh_color.glsl';
import {uniforms} from '../shaders/fsh_color.glsl';


// closure var
var quad:THREE.Mesh,
    scale:number = 1.0,
    count:number = 0,
    flag:boolean = true;


export var Quad = {
  create: (options:any = {
    width:1.0, 
    height:1.0,
    x:0.0,
    y:0.0,
    z:-0.5, // layer1 (layer0 is grid z=0)
    color: new THREE.Color(0x0000ff),   // blue 
  }):Promise<THREE.Mesh> => {

    console.log(`quad.create() options= `);
    console.dir(options);

    var quad_g:THREE.BufferGeometry,
        quad_m:THREE.Material,
        vertex:THREE.Vector3 = new THREE.Vector3(),
        vertices:Float32Array = new Float32Array( [
	  -1.0, -1.0,  0.0,
          1.0, -1.0,  0.0,
          1.0,  1.0,  0.0,
          1.0,  1.0,  0.0,
          -1.0,  1.0,  0.0,
          -1.0, -1.0,  0.0
        ] ),
        promise:Promise<THREE.Mesh> = new Promise((resolve, reject) => {

          try{
            // quad geometry
            quad_g = new THREE.BufferGeometry();
            quad_g.addAttribute('position', new THREE.BufferAttribute(vertices,3));
  
            // quad material
             quad_m = new THREE.MeshBasicMaterial({color: options.color, side: THREE.DoubleSide}); 
  
            // quad Mesh
            // set position and perspective scaling - so quad appears as if
            // it is on the z=0 XZ-plane
            quad = new THREE.Mesh(quad_g, quad_m);
            quad.position.x = options.x;
            quad.position.y = options.y;
            quad.position.z = options.z;
  
            // add quad render function called by graphics service each frame
            quad['render'] = (options:any = {color:0x00ff00}):void => {
              if(count++ % 1000 === 1){
                if(flag = !flag){
                  quad_m.color = new THREE.Color(0x00ff00); 
//                  quad.geometry.attributes.position.array = new Float32Array( [
//            	    -1.0, -2.0,  0.0,
//            	    1.0, -2.0,  0.0,
//                    1.0,  2.0,  0.0,
//                    1.0,  2.0,  0.0,
//                    -1.0,  2.0,  0.0,
//            	    -1.0, -2.0,  0.0
//                  ]);
                }else{
                  quad_m.color = new THREE.Color(0xff0000); 
//                  quad.geometry.attributes.position.array = new Float32Array( [
//            	    -0.5, -1.0,  0.0,
//            	    0.5, -1.0,  0.0,
//                    0.5,  1.0,  0.0,
//                    0.5,  1.0,  0.0,
//                    -0.5,  1.0,  0.0,
//            	    -0.5, -1.0,  0.0
//                  ]);
                }
//                scale = (10.0-quad.position.z)/10.0;
//                quad.scale.set(scale,scale,1.0);
//                quad.geometry.attributes.position.needsUpdate = true;
              }
            };//render()
  
            resolve(quad);
          }catch(e){
            reject(e);
          }
      });//promise
      return promise;     
    }//create()

};//Quad
