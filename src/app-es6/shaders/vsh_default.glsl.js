System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vsh;
    return {
        setters: [],
        execute: function () {
            // Vertex shader program 
            // vsh_default - texture map
            exports_1("vsh", vsh = `
      varying vec2 vuv;
      void main() {
        gl_Position = vec4(position.xy, 1.0, 1.0);
        vuv = uv;
      }
      `);
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYWRlcnMvdnNoX2RlZmF1bHQuZ2xzbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O1lBQUEseUJBQXlCO1lBQ3pCLDRCQUE0QjtZQUM1QixpQkFBVyxHQUFHLEdBQVU7Ozs7OztPQU1qQixFQUFDO1FBRVIsQ0FBQyIsImZpbGUiOiJzaGFkZXJzL3ZzaF9kZWZhdWx0Lmdsc2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBWZXJ0ZXggc2hhZGVyIHByb2dyYW0gXG4vLyB2c2hfZGVmYXVsdCAtIHRleHR1cmUgbWFwXG5leHBvcnQgdmFyIHZzaDpzdHJpbmcgPSBgXG4gICAgICB2YXJ5aW5nIHZlYzIgdnV2O1xuICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24ueHksIDEuMCwgMS4wKTtcbiAgICAgICAgdnV2ID0gdXY7XG4gICAgICB9XG4gICAgICBgO1xuXG4iXX0=
