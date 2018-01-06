System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Ohlc;
    return {
        setters: [],
        execute: function () {
            exports_1("Ohlc", Ohlc = {
                create: (depth, ohlca) => {
                    var actor = new THREE.Group(), 
                    open = ohlca[0], high = ohlca[1], low = ohlca[2], close = ohlca[3], 
                    dhl = Math.max(high - low, 1.0), yhl = (high + low) * 0.5, glyph_color = open > close ? 'red' : 'green', 
                    quad_g, quad_m, quad, 
                    vertices, pointO_g, pointO_m, pointO, 
                    pointC_g, pointC_m, pointC;
                    quad_g = new THREE.PlaneBufferGeometry(0.2, dhl);
                    quad_m = new THREE.MeshBasicMaterial({ color: glyph_color, transparent: false });
                    quad = new THREE.Mesh(quad_g, quad_m);
                    quad.position.y = yhl;
                    quad.position.z = depth - 0.01;
                    actor.add(quad);
                    pointO_g = new THREE.BufferGeometry();
                    vertices = new Float32Array([
                        -0.1, open, depth - 0.02
                    ]);
                    pointO_g.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                    pointO_m = new THREE.PointsMaterial({ size: 0.2, color: glyph_color,
                        transparent: false, sizeAttenuation: true });
                    pointO = new THREE.Points(pointO_g, pointO_m);
                    actor.add(pointO);
                    pointC_g = new THREE.BufferGeometry();
                    vertices = new Float32Array([
                        0.1, close, depth - 0.02
                    ]);
                    pointC_g.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
                    pointC_m = new THREE.PointsMaterial({ size: 0.2, color: glyph_color,
                        transparent: false, sizeAttenuation: true });
                    pointC = new THREE.Points(pointC_g, pointC_m);
                    actor.add(pointC);
                    return { past: [], recent: [actor] };
                } 
            });
        }
    };
});

