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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYWRlcnMvdnNoX3ZlcnRpY2VzLmdsc2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBLHlCQUF5QjtZQUN6Qiw0QkFBNEI7WUFDNUIsaUJBQVcsR0FBRyxHQUFVOzs7Ozs7T0FNakIsRUFBQztRQUVSLENBQUMiLCJmaWxlIjoic2hhZGVycy92c2hfdmVydGljZXMuZ2xzbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFZlcnRleCBzaGFkZXIgcHJvZ3JhbSBcbi8vIHZzaF9kZWZhdWx0IC0gdGV4dHVyZSBtYXBcbmV4cG9ydCB2YXIgdnNoOnN0cmluZyA9IGBcbiAgICAgIHZhcnlpbmcgdmVjMiB2dXY7XG4gICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgIGdsX1Bvc2l0aW9uID0gdmVjNChwb3NpdGlvbi54eSwgMS4wLCAxLjApO1xuICAgICAgICB2dXYgPSB1djtcbiAgICAgIH1cbiAgICAgIGA7XG5cbiJdfQ==
