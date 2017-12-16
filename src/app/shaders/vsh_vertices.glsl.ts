// Vertex shader program 
// vsh_vertices
// assumes positions p are in world coordinates

export var vsh:string = `
attribute vec3 p;

      void main() {
        //gl_Position = vec4(p, 1.0);
        vec4 mv_position = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv_position;
      }
      `;

