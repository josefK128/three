System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var uniforms, fsh;
    return {
        setters: [],
        execute: function () {
            exports_1("uniforms", uniforms = {
                tDiffuse: { type: 't', value: null },
                uTime: { type: 'f', value: 0.0 }
            });
            exports_1("fsh", fsh = `
      #ifdef GL_ES
      precision mediump float;
      #endif
      uniform sampler2D tDiffuse; 
      uniform float uTime; 
      varying vec2 vuv;

      void main() {
        // texture-map
        gl_FragColor = texture2D(tDiffuse, vuv); 
      }`);
        }
    };
});

