// Vertex shader program 
// vsh_vertices
// assumes positions are in world coordinates

export var vsh:string = `
      varying vec2 vuv;
      void main() {
        vec4 mv_position = viewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv_position;
        vuv = uv;
      }
      `;

