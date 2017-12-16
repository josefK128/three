// test-minimal.ts - simple test configuration

import {Config} from './config.interface';


// for space.ts initialization
const config:Config = {

    // _map is name of models/camera/keymap file
    _map: '',

    // camera controls - _controls url or false
    _controls:'',
    controlsOptions:{},

 
    // canvas - renderer
    canvas_id: 'space',
    clearColor:'white',
    alpha:1.0,
    antialias:true
};


export {config};
