System.config({
  transpiler: "typescript",
  typescriptOptions: {
    "target": "es6",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  },

  // for systemjs to correctly substitute for truncated paths
  map: {
    'app-es6' : './',
    'typescript' : '../node_modules/typescript/lib/typescript.js'
  },

  // for systemjs to correctly substitute for implied files and/or ts/js
  packages: {
    'app-es6'  : {main: 'app', defaultExtension: 'js'}
  }
});
