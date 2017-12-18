System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vsh;
    return {
        setters: [],
        execute: function () {
            exports_1("vsh", vsh = `
      varying vec2 vuv;
      void main() {
        vec4 mv_position = viewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv_position;
        vuv = uv;
      }
      `);
        }
    };
});

