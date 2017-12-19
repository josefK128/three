// Fragment shader program 
// fsh_color - color of actor given by uColor - default blue
// default alpha = 1.0 (opaque) set in gl_FragColor = vec4(uColor, 1.0); 

export var uniforms:Object = {
  uColor:{type: 'c', value: new THREE.Color(0x0000ff)},
};

export var fsh:string = `
      #ifdef GL_ES
      precision mediump float;
      #endif
      uniform vec3 uColor;

      void main() {
        //gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); 
        gl_FragColor = vec4(uColor, 1.0); 
      }`;


