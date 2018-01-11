var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    sassGlob    = require('gulp-sass-glob'),
    sourcemaps  = require('gulp-sourcemaps'),
    plumber     = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    importOnce  = require('node-sass-import-once');

var options = {};

options.path = {
  project : __dirname + '/',
  sass    : __dirname + '/sass',
  css     : __dirname + '/css',
  images  : __dirname + '/images',
}

options.sass = {
  importer: importOnce,
  includePaths: [
    options.path.sass,
  ],
  outputStyle: 'compressed'
};

// ======
// CONFIG
// ======
var DIR_MAP = ['./css/*.map', './css/*/*.map'];
var DIR_SCSS = ['./sass/*.scss', './sass/*/*.scss'];


/*
 |--------------------------------------------------------------------------
 | Error handling
 |--------------------------------------------------------------------------
 |
 | This is needed in case we are using "gulp watch" and the build fails
 | it will avoid the process to exit.
 |
 */

var onError = function(err) {
    console.log('\u001b[1;31m\u2620 error detected in plugin: \u001b[0m ' + err.plugin);
    //console.log(err.message);
    this.emit('end');
};

// ==========
// Compile Sass
// ==========

gulp.task('compile-css', function() {
  gulp.src(DIR_SCSS)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(options.path.css))
    .pipe(browserSync.stream());
});

// ==========
// Watch Task
// ==========

gulp.task('watch', function() {
    gulp.watch(DIR_SCSS, ['compile-css']);
});

// ==========
// BrowserSync
// ==========

gulp.task('run', ['compile-css'], function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html",
            middleware: function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    });
    gulp.watch(DIR_SCSS, ['compile-css']);
    gulp.watch(["./index.html", "./js/scripts.js"], [browserSync.reload]);
    gulp.watch(options.path.images + '/**/*.+(jpeg|jpg|png|gif|svg)');
});