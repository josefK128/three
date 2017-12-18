System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var uniforms, fsh;
    return {
        setters: [],
        execute: function () {
            exports_1("uniforms", uniforms = {
                uColor: { type: 'c', value: new THREE.Color(0x0000ff) },
            });
            exports_1("fsh", fsh = `
      #ifdef GL_ES
      precision mediump float;
      #endif
      uniform vec3 uColor;

      void main() {
        //gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); 
        gl_FragColor = vec4(uColor, 1.0); 
      }`);
        }
    };
});

