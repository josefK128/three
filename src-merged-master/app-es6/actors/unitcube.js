System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var create;
    return {
        setters: [],
        execute: function () {
            exports_1("create", create = (options = {}) => {
                var cube_g, cube_m, cube, 
                wireframe = options['wireframe'] || false, color = options['color'] || 'red', opacity = options['opacity'] || 1.0;
                return new Promise((resolve, reject) => {
                    cube_g = new THREE.BoxBufferGeometry(1.0, 1.0, 1.0);
                    cube_m = new THREE.MeshBasicMaterial({
                        wireframe: wireframe,
                        color: color,
                        transparent: true,
                        opacity: opacity,
                        side: THREE.DoubleSide
                    });
                    cube_m.blendSrc = THREE.SrcAlphaFactor; 
                    cube_m.blendDst = THREE.OneMinusSrcAlphaFactor; 
                    cube = new THREE.Mesh(cube_g, cube_m);
                    cube['delta'] = (options = {}) => {
                        cube_m.wireframe = options['wireframe'] || cube_m.wireframe;
                        cube_m.color = options['color'] || cube_m.color;
                        cube_m.transparent = options['transparent'] || cube_m.transparent;
                    };
                    resolve(cube);
                }); 
            });
        }
    };
});

