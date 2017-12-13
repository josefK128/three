System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Line;
    return {
        setters: [],
        execute: function () {
            // line.ts
            exports_1("Line", Line = {
                create: (options = {
                        max_vertices: 900,
                        drawCount: 3,
                        color: 0xff0000,
                        lineWidth: 2,
                        vertices: [0, 0, 0, -2, 16, 0, -4, 0, 0,]
                    }) => {
                    console.log(`line.create() options= `);
                    console.dir(options);
                    var g, m, positions, drawCount, line, promise = new Promise((resolve, reject) => {
                        try {
                            g = new THREE.BufferGeometry();
                            m = new THREE.LineBasicMaterial(options.color, options.lineWidth);
                            // create custom attribute for BufferGeometry
                            // (x,y,z) => 3 vertices per point
                            positions = new Float32Array(options.max_vertices * 3);
                            g.addAttribute('position', new THREE.BufferAttribute(positions, 3));
                            // set rendering set
                            drawCount = options.drawCount;
                            g.setDrawRange(0, drawCount);
                            // create line
                            line = new THREE.Line(g, m);
                            // assign positions the attribute 'position'
                            positions = line.geometry.attributes.position.array;
                            for (let i = 0; i < options.vertices.length; i++) {
                                positions[i] = options.vertices[i];
                            }
                            for (let i = options.vertices.length; i < options.max_vertices * 3;) {
                                positions[i++] = -2 * i;
                                positions[i++] = 64.0 * Math.random();
                                positions[i++] = 0.0;
                            }
                            line.geometry.attributes.position.needsUpdate = true;
                            // scale function - LATER send vec3 <sx,sy,sz> as attribute to GPU
                            line['_scale'] = (sx = 1.0, sy = 1.0, sz = 1.0) => {
                                console.log(`scale: sx=${sx} sy=${sy} sz=${sz}`);
                            };
                            resolve(line);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    return promise;
                }
            });
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLEtBQVUsR0FBRyxFQUFPLEVBQUU7Z0NBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ25ELENBQUMsQ0FBQzs0QkFFRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hCLENBQUM7d0JBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQzs0QkFDUixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1osQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUNuQixDQUFDO2FBQ0osRUFBQztRQUNGLENBQUMiLCJmaWxlIjoiYWN0b3JzL2xpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsaW5lLnRzXG5leHBvcnQgdmFyIExpbmUgPSB7XG4gIGNyZWF0ZTogKG9wdGlvbnM6YW55ID0ge1xuICAgIG1heF92ZXJ0aWNlczogOTAwLCBcbiAgICBkcmF3Q291bnQ6MywgXG4gICAgY29sb3I6IDB4ZmYwMDAwLCBcbiAgICBsaW5lV2lkdGg6IDIsIFxuICAgIHZlcnRpY2VzOiBbMCwwLDAsIC0yLDE2LDAsIC00LDAsMCxdXG4gIH0pOlByb21pc2U8VEhSRUUuTGluZT4gPT4ge1xuXG4gICAgY29uc29sZS5sb2coYGxpbmUuY3JlYXRlKCkgb3B0aW9ucz0gYCk7XG4gICAgY29uc29sZS5kaXIob3B0aW9ucyk7XG5cbiAgICB2YXIgZzpUSFJFRS5CdWZmZXJHZW9tZXRyeSxcbiAgICAgICAgbTpUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCxcbiAgICAgICAgcG9zaXRpb25zOkZsb2F0MzJBcnJheSxcbiAgICAgICAgZHJhd0NvdW50Om51bWJlcixcbiAgICAgICAgbGluZTpUSFJFRS5MaW5lLFxuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgICAgICAgICAgbSA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbChvcHRpb25zLmNvbG9yLCBvcHRpb25zLmxpbmVXaWR0aCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBjdXN0b20gYXR0cmlidXRlIGZvciBCdWZmZXJHZW9tZXRyeVxuICAgICAgICAgICAgLy8gKHgseSx6KSA9PiAzIHZlcnRpY2VzIHBlciBwb2ludFxuICAgICAgICAgICAgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShvcHRpb25zLm1heF92ZXJ0aWNlcyozKTsgXG4gICAgICAgICAgICBnLmFkZEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywzKSk7XG5cbiAgICAgICAgICAgIC8vIHNldCByZW5kZXJpbmcgc2V0XG4gICAgICAgICAgICBkcmF3Q291bnQgPSBvcHRpb25zLmRyYXdDb3VudDtcbiAgICAgICAgICAgIGcuc2V0RHJhd1JhbmdlKDAsIGRyYXdDb3VudCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsaW5lXG4gICAgICAgICAgICBsaW5lID0gbmV3IFRIUkVFLkxpbmUoZyxtKTtcblxuICAgICAgICAgICAgLy8gYXNzaWduIHBvc2l0aW9ucyB0aGUgYXR0cmlidXRlICdwb3NpdGlvbidcbiAgICAgICAgICAgIHBvc2l0aW9ucyA9IGxpbmUuZ2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG9wdGlvbnMudmVydGljZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICBwb3NpdGlvbnNbaV0gPSBvcHRpb25zLnZlcnRpY2VzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yKGxldCBpPW9wdGlvbnMudmVydGljZXMubGVuZ3RoOyBpPG9wdGlvbnMubWF4X3ZlcnRpY2VzKjM7KXtcbiAgICAgICAgICAgICAgcG9zaXRpb25zW2krK10gPSAtMippO1xuICAgICAgICAgICAgICBwb3NpdGlvbnNbaSsrXSA9IDY0LjAqTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgcG9zaXRpb25zW2krK10gPSAwLjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW5lLmdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24ubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBzY2FsZSBmdW5jdGlvbiAtIExBVEVSIHNlbmQgdmVjMyA8c3gsc3ksc3o+IGFzIGF0dHJpYnV0ZSB0byBHUFVcbiAgICAgICAgICAgIGxpbmVbJ19zY2FsZSddID0gKHN4Om51bWJlcj0xLjAsc3k6bnVtYmVyPTEuMCxzejpudW1iZXI9MS4wKTp2b2lkID0+ICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgc2NhbGU6IHN4PSR7c3h9IHN5PSR7c3l9IHN6PSR7c3p9YCk7XG4gICAgICAgICAgICB9O1xuICBcbiAgICAgICAgICAgIHJlc29sdmUobGluZSk7XG4gICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn07XG4iXX0=
