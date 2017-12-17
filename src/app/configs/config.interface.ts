export interface Config {

  // controller app url
  _app:string;

  // keymap
  _map:string;

  // camera controls
  _controls:string;
  controlsOptions:Object;

  // canvas - renderer
  canvas_id:string;
  clearColor:string;
  alpha:number;
  antialias:boolean;
}

