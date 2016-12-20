/**
 * Created by libra1010 on 2016/12/20.
 */
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("gulp.5.default", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,//同样debug为true,和其他不同的就是 会有一个 bundle.js.map 文件
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))//这里就会生成单独的 soucemap文件
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist"));
});

//注意uglify只是调用了自己—buffer和sourcemaps的调用是用于确保sourcemaps可以工作。 这些调用让我们可以使用单独的sourcemap文件，
// 而不是之前的内嵌的sourcemaps。 你现在可以执行 gulp来检查bundle.js是否被压缩了：