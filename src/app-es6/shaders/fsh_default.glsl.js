System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var uniforms, fsh;
    return {
        setters: [],
        execute: function () {
            // Fragment shader program 
            // fsh_default - texture map
            exports_1("uniforms", uniforms = {
                tDiffuse: { type: 't', value: null },
                uTime: { type: 'f', value: 0.0 },
                uResolution: { type: 'v2', value: new THREE.Vector2(960, 1080) }
            });
            exports_1("fsh", fsh = `
      #ifdef GL_ES
      precision mediump float;
      #endif
      uniform sampler2D tDiffuse; 
      uniform float uTime; 
      varying vec2 vuv;

      void main() {
        // map texture pixels to [-1,1]x[-1,1] near plane of fsh-eye fov=90
        vec3 fwd = normalize(vec3(2.0*vuv.s-1.0, 2.0*vuv.t-1.0,-1.0));

        // paint
        gl_FragColor = texture2D(tDiffuse, vuv); 
      }`);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYWRlcnMvZnNoX2RlZmF1bHQuZ2xzbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEsMkJBQTJCO1lBQzNCLDRCQUE0QjtZQUM1QixzQkFBVyxRQUFRLEdBQVU7Z0JBQzNCLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztnQkFDbEMsS0FBSyxFQUFDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDO2dCQUM3QixXQUFXLEVBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxFQUFDO2FBQzdELEVBQUM7WUFFRixpQkFBVyxHQUFHLEdBQVU7Ozs7Ozs7Ozs7Ozs7O1FBY2hCLEVBQUM7UUFHVCxDQUFDIiwiZmlsZSI6InNoYWRlcnMvZnNoX2RlZmF1bHQuZ2xzbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEZyYWdtZW50IHNoYWRlciBwcm9ncmFtIFxuLy8gZnNoX2RlZmF1bHQgLSB0ZXh0dXJlIG1hcFxuZXhwb3J0IHZhciB1bmlmb3JtczpPYmplY3QgPSB7XG4gIHREaWZmdXNlOiB7dHlwZTogJ3QnLCB2YWx1ZTogbnVsbH0sXG4gIHVUaW1lOnt0eXBlOiAnZicsIHZhbHVlOiAwLjB9LFxuICB1UmVzb2x1dGlvbjp7dHlwZTogJ3YyJywgdmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKDk2MCwxMDgwKX1cbn07XG5cbmV4cG9ydCB2YXIgZnNoOnN0cmluZyA9IGBcbiAgICAgICNpZmRlZiBHTF9FU1xuICAgICAgcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4gICAgICAjZW5kaWZcbiAgICAgIHVuaWZvcm0gc2FtcGxlcjJEIHREaWZmdXNlOyBcbiAgICAgIHVuaWZvcm0gZmxvYXQgdVRpbWU7IFxuICAgICAgdmFyeWluZyB2ZWMyIHZ1djtcblxuICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAvLyBtYXAgdGV4dHVyZSBwaXhlbHMgdG8gWy0xLDFdeFstMSwxXSBuZWFyIHBsYW5lIG9mIGZzaC1leWUgZm92PTkwXG4gICAgICAgIHZlYzMgZndkID0gbm9ybWFsaXplKHZlYzMoMi4wKnZ1di5zLTEuMCwgMi4wKnZ1di50LTEuMCwtMS4wKSk7XG5cbiAgICAgICAgLy8gcGFpbnRcbiAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHREaWZmdXNlLCB2dXYpOyBcbiAgICAgIH1gO1xuXG5cbiJdfQ==
