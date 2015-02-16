'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();


gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});


gulp.task('serve', ['connect'], function () {
    require('opn')('http://localhost:9000');
});



gulp.task('styles', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe($.compass({
            css: 'app/styles',
            sass: 'app/sass',
            img: 'app/images'
        }))
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({stream:true}));
});



gulp.task('default', ['serve'], function () {
    var server = $.livereload();

    gulp.watch('app/sass/**/*.scss', ['styles']);
    gulp.watch([
        'app/*.html',
        'app/styles/**/*.css',
        'app/sass/**/*.scss',
        'app/scripts/**/*.js'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

});

