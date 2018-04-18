var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
//var connect = require('gulp-connect');
gulp.task('scripts', function () {
    gulp.src('Script/APPScript/**/*.js')
        .pipe(concat('all.js'))
        //.pipe(gulp.dest("dist"))
        //.pipe(rename('all.min.js'))
        //.pipe(uglify({mangle:false}))
        .pipe(gulp.dest('dist'));
});

// gulp.task('connect', function () {
//   connect.server({
//     root: './',
//     port:3000,
//     livereload: true
//   });
// });

gulp.task('default', function () {
    gulp.run('scripts');
    //gulp.run('connect');

    // 监听文件变化
    gulp.watch('Script/APPScript/**/*.js', function () {
        gulp.run('scripts');
    });
});