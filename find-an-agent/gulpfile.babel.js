'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import BrowserSync from 'browser-sync';

const browserSync = BrowserSync.create();

const dirs = {
  root: '.',
  sass: './sass',
  style: './styles'
};

const sassPaths = {
  app: `${dirs.sass}/`,
  dest: `${dirs.style}`
};

gulp.task('styles', () => {
  return gulp.src(`${dirs.sass}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(browserSync.stream());;
});


// Static Server + watching scss/html files
gulp.task('serve', ['styles'], () => {
  browserSync.init({
    server: dirs.root
  });

  gulp.watch(`${dirs.sass}/**/*.scss`, ['styles']);
  gulp.watch(`${dirs.root}/*.html`).on('change', browserSync.reload);
});

//Watch task
gulp.task('default', ['serve']);
