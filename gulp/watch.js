'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var paths = gulp.paths;

gulp.task('watch', ['inject'], function () {
    livereload.listen();
    gulp.watch([
        paths.src + '/*.html',
        paths.src + '/{app,components}/**/*.html',
        paths.src + '/{app,componentsm,assets}/**/*.css',
        paths.src + '/{app,components}/**/*.js',
        paths.src + '/{app,components,assets}/**/*.json',
        'bower.json'
    ], ['inject']);
});
