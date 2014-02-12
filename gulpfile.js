'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
        .pipe(livereload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', ['lint', 'scripts']);
    gulp.watch('./src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
