var gulp = require('gulp');
var sass = require('gulp-sass')(require('node-sass'));
var postcss = require('gulp-postcss');
var gulpif = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var {paths, env} = require('../setup.js');

function buildCss(path) {
  return function () {
    return gulp.src(`${paths.src.styles}/${path}.scss`)
      .pipe(plumber())
      .pipe(postcss([require('stylelint')], {syntax: require('postcss-scss')}))
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([require('autoprefixer')]))
      .pipe(gulpif(env.current.mode != env.local.mode, cleanCSS()))
      .pipe(gulp.dest(paths.dest.styles))
      .pipe(gulpif(env.current.mode == env.local.mode, browserSync.get('setjs-serve').stream()));
  };
}

exports.styles = gulp.parallel(
  // buildCss('common'),
  buildCss('main'),
);
