System.config({
  transpiler: "typescript",
  typescriptOptions: {
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  },

  // for systemjs to correctly substitute for truncated paths
  map: {
    'app' : './',
    'typescript' : '../node_modules/typescript/lib/typescript.js'
  },

  // for systemjs to correctly substitute for implied files and/or ts/js
  packages: {
    'app'  : {main: 'app', defaultExtension: 'ts'}
  }
});
