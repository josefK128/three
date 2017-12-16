// gulpfile.js - automated tasks - default ('gulp') is ts->js compile
// run: $>gulp <taskname>
//
// * NOTE: There is no explicit task 'task-list'. 
//         However 'gulp task-list' will produce a complete list 
//         of tasks and dependencies to stdout
//         pipe to 'gulpfile.tasks' for exp:
//         $ gulp task-list >gulpfile.tasks

// dependencies
var gulp = require('gulp');
var tslint = require("gulp-tslint");
var typescript = require('gulp-typescript');
var tsconfig = require('./tsconfig.json');
//var docco = require('gulp-docco');
//var del = require('del');
//var exec = require('child_process').exec;
var sass = require('gulp-sass');
//var concat = require('gulp-concat');
//var annotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var strip = require('gulp-strip-comments');
//var uglify = require('gulp-uglify');
//require('gulp-task-list')(gulp);

 


// directory/file glob-patterns
// src - includes spec.ts unit-test files
var tsFiles = [
  './src/app/*.ts', 
  './src/app/**/*.ts'
];

// write destinations
var srcDest_es5 = './src/app-es5/',
    srcDest_es6 = './src/app-es6/';

// styles
var styleFiles = [
  './src/styles/scss/*.scss'
];

var styleFilesDest = './src/styles/css';



// tasks
// task - ts2js: app/x.ts -> app-es6/x.js
// NOTE: includes spec.ts unit-test files
// NOTE: default task!
gulp.task('default', ['ts2js']);
gulp.task('ts2js', () => {
    var tsResult = gulp
        .src(tsFiles)
        .pipe(sourcemaps.init())
        .pipe(tslint({formatter:'verbose'}))
        .pipe(tslint.report())
        .pipe(typescript(tsconfig.compilerOptions));

    if(tsconfig.compilerOptions.target === 'es5'){
        return tsResult.js
          .pipe(strip())
          .pipe(gulp.dest(srcDest_es5));
    }
    return tsResult.js
        //.pipe(sourcemaps.write('.')) // for separate sourcemap-files
        .pipe(sourcemaps.write())     // for sourcemap inline at end of js-file
        .pipe(strip())
        .pipe(gulp.dest(srcDest_es6));
});

// 'nostripping' (ts2js-ns) of comments in the output .js-file
gulp.task('ts2js-ns', () => {
    var tsResult = gulp
        .src(tsFiles)
        .pipe(sourcemaps.init())
        .pipe(tslint({formatter:'verbose'}))
        .pipe(tslint.report())
        .pipe(typescript(tsconfig.compilerOptions));

    if(tsconfig.compilerOptions.target === 'es5'){
        return tsResult.js.pipe(gulp.dest(srcDest_es5));
    }
    return tsResult.js
        //.pipe(sourcemaps.write('.')) // for separate sourcemap-files
        .pipe(sourcemaps.write())     // for sourcemap inline at end of js-file
        .pipe(gulp.dest(srcDest_es6));
});


// task - sass:<br>
// translates .scss-files to .css-files
gulp.task('sass', () => {
  gulp.src(styleFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(styleFilesDest));
});


// clean
gulp.task('clean', (done) => {
    del(['./src/app-es6/*.js'], done);
    del(['./src/app-es6/**/*.js'], done);
    del(['./dist/*.js'], done);
});


