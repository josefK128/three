// quad_shm.ts
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
    vertices:Float32Array = new Float32Array( [
      -1.0, -1.0,  0.0,
      1.0, -1.0,  0.0,
      1.0,  1.0,  0.0,
      1.0,  1.0,  0.0,
      -1.0,  1.0,  0.0,
      -1.0, -1.0,  0.0
    ] ),
    count:number = 0,
    flag:boolean = true;


export var Quad_shm = {
  create: (options:any = {
    width:1.0, 
    height:1.0,
    x:0.0,
    y:6.0,
    z:0.0, // set z by layer[i] inclusion
    color_gain: new THREE.Color(0x00ff00),   // green 
    color_loss: new THREE.Color(0xff0000)   // red 
  }):Promise<THREE.Mesh> => {

    console.log(`Quad_shm.create() options= `);
    console.dir(options);

    var quad_g:THREE.BufferGeometry,
        quad_m:THREE.ShaderMaterial,
        promise:Promise<THREE.Mesh> = new Promise((resolve, reject) => {

          try{
            // quad geometry
            quad_g = new THREE.BufferGeometry();
            quad_g.addAttribute('position', new THREE.BufferAttribute(vertices,3));
            // quad material
            quad_m = new THREE.ShaderMaterial({
              vertexShader: vsh,
              fragmentShader: fsh,
              uniforms:uniforms,
              side: THREE.DoubleSide}); 
  
            // quad Mesh
            // set position and perspective scaling - so quad appears as if
            // it is on the z=0 XZ-plane
            quad = new THREE.Mesh(quad_g, quad_m);
            quad.position.set(options.x, options.y, options.z);
            console.log(`quad_shm1.position = ${quad.position.toArray()}`);


            // add quad render function called by graphics service each frame
            quad['render'] = ():void => {
              if(count++ % 1000 === 1){
                if(flag = !flag){
                  quad.material.uniforms.uColor.value = options.color_loss;
                  quad.geometry.attributes.position.array = new Float32Array( [
            	    -1.0, -0.5,  0.0,
            	    1.0, -0.5,  0.0,
                    1.0,  0.5,  0.0,
                    1.0,  0.5,  0.0,
                    -1.0,  0.5,  0.0,
            	    -1.0, -0.5,  0.0
                  ]);
                }else{
                  quad.material.uniforms.uColor.value = options.color_gain;
                  quad.geometry.attributes.position.array = new Float32Array( [
            	    -1.0, -1.0,  0.0,
            	    1.0, -1.0,  0.0,
                    1.0,  1.0,  0.0,
                    1.0,  1.0,  0.0,
                    -1.0,  1.0,  0.0,
            	    -1.0, -1.0,  0.0
                  ]);
                }
                quad.geometry.attributes.position.needsUpdate = true;
                quad.material.uniforms.uColor.needsUpdate = true;
              }
            };//render()
  
            resolve(quad);
          }catch(e){
            reject(e);
          }
      });//promise
      return promise;     
    }//create()

};//Quad_shm
