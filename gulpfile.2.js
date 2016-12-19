/**
 * Created by clam on 2016/12/19.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),//压缩CSS
    concat = require('gulp-concat'),//文件合并
    uglify = require('gulp-uglify'),//压缩JS
    rename = require('gulp-rename'),//修改名称
    del = require('del');//删除插件

gulp.task('minifycss', function() {
    return gulp.src('src/*.css')      //压缩的文件
        .pipe(minifycss())  //执行压缩
        .pipe(gulp.dest('minified/css')) ;  //输出文件夹

});

gulp.task('minifyjs', function() {
    return gulp.src('dist/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('minified/js'));  //输出
});
//清空文件夹
gulp.task('clean', function(cb) {
    del(['minified/css', 'minified/js'], cb)
});

gulp.task('gulp.2.default', function() {
    gulp.start('minifycss', 'minifyjs');
});