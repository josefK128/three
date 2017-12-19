// Vertex shader program 
// vsh_vertices
// assumes positions are in local coordinates - local vertices
// local vertices are transformed into camera coordinates by modelViewMatrix
// which is the product of the modelMatrix (transforming local to world coords)
// and the viewMatrix (transforming world to camera coords).
// Finally the projectionMatrix transforms the camera coords to the output
// framebuffer screen which is the near clip-plane of the camera
// It also passes any texture coords uv->vuv to the fragment shader
export var vsh:string = `
      varying vec2 vuv;
      void main() {
        vec4 mv_position = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv_position;
        vuv = uv;
      }
      `;

