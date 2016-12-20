/**
 * Created by libra1010 on 2016/12/20.
 */
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var paths = {
    pages: ['src/*.html']
};

//这里就是启动一个监控实例
var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}

//启动default任务，我们发现gulp一直在运行，并且修改main.ts 保存后，会自动将TS合并到bundle.js里面
gulp.task("gulp.4.default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

//将browserify实例包裹在watchify的调用里，控制生成的结果。
//调用watchedBrowserify.on("update", bundle);，每次TypeScript文件改变时Browserify会执行bundle函数。
//调用watchedBrowserify.on("log", gutil.log);将日志打印到控制台。