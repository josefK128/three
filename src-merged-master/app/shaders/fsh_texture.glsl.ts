// Fragment shader program 
// fsh_texture - texture map set by tDiffuse
// Also current elapsed time passed into uniform uTime
export var uniforms:Object = {
  tDiffuse: {type: 't', value: null},
  uTime:{type: 'f', value: 0.0}
};

export var fsh:string = `
      #ifdef GL_ES
      precision mediump float;
      #endif
      uniform sampler2D tDiffuse; 
      uniform float uTime; 
      varying vec2 vuv;

      void main() {
        // texture-map
        gl_FragColor = texture2D(tDiffuse, vuv); 
      }`;


