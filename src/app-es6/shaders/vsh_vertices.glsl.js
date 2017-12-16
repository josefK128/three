System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vsh;
    return {
        setters: [],
        execute: function () {
            exports_1("vsh", vsh = `
attribute vec3 p;

      void main() {
        //gl_Position = vec4(p, 1.0);
        vec4 mv_position = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv_position;
      }
      `);
        }
    };
});

