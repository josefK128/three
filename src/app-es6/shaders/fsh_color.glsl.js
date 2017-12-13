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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYWRlcnMvZnNoX2NvbG9yLmdsc2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBLDJCQUEyQjtZQUMzQiw0QkFBNEI7WUFDNUIsc0JBQVcsUUFBUSxHQUFVO2dCQUMzQixRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7Z0JBQ2xDLEtBQUssRUFBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQztnQkFDN0IsV0FBVyxFQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsRUFBQzthQUM3RCxFQUFDO1lBRUYsaUJBQVcsR0FBRyxHQUFVOzs7Ozs7Ozs7Ozs7OztRQWNoQixFQUFDO1FBR1QsQ0FBQyIsImZpbGUiOiJzaGFkZXJzL2ZzaF9jb2xvci5nbHNsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRnJhZ21lbnQgc2hhZGVyIHByb2dyYW0gXG4vLyBmc2hfZGVmYXVsdCAtIHRleHR1cmUgbWFwXG5leHBvcnQgdmFyIHVuaWZvcm1zOk9iamVjdCA9IHtcbiAgdERpZmZ1c2U6IHt0eXBlOiAndCcsIHZhbHVlOiBudWxsfSxcbiAgdVRpbWU6e3R5cGU6ICdmJywgdmFsdWU6IDAuMH0sXG4gIHVSZXNvbHV0aW9uOnt0eXBlOiAndjInLCB2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoOTYwLDEwODApfVxufTtcblxuZXhwb3J0IHZhciBmc2g6c3RyaW5nID0gYFxuICAgICAgI2lmZGVmIEdMX0VTXG4gICAgICBwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiAgICAgICNlbmRpZlxuICAgICAgdW5pZm9ybSBzYW1wbGVyMkQgdERpZmZ1c2U7IFxuICAgICAgdW5pZm9ybSBmbG9hdCB1VGltZTsgXG4gICAgICB2YXJ5aW5nIHZlYzIgdnV2O1xuXG4gICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgIC8vIG1hcCB0ZXh0dXJlIHBpeGVscyB0byBbLTEsMV14Wy0xLDFdIG5lYXIgcGxhbmUgb2YgZnNoLWV5ZSBmb3Y9OTBcbiAgICAgICAgdmVjMyBmd2QgPSBub3JtYWxpemUodmVjMygyLjAqdnV2LnMtMS4wLCAyLjAqdnV2LnQtMS4wLC0xLjApKTtcblxuICAgICAgICAvLyBwYWludFxuICAgICAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodERpZmZ1c2UsIHZ1dik7IFxuICAgICAgfWA7XG5cblxuIl19
