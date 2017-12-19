// Vertex shader program 
// vsh_vertices_world
// assumes positions are in world coordinates 
// world-coordinates are transformed into camera coordinates by viewMatrix
// Finally the projectionMatrix transforms the camera coords to the output
// framebuffer screen which is the near clip-plane of the camera
// It also passes any texture coords uv->vuv to the fragment shader
export var vsh:string = `
      varying vec2 vuv;
      void main() {
        vec4 mv_position = viewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv_position;
        vuv = uv;
      }
      `;

