/**
 * Created by clam on 2016/12/19.
 */
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
    pages: ['src/*.html']
};

//复制HTML到dist文件夹
gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

//一个任务，依赖于copy-html 任务，会限制性copy-html任务，然后在执行当前任务
gulp.task("gulp.3.default", ["copy-html"], function () {
    //创建browserify entries表示文件入口，会将文件入口里面所有使用到的模块全部打包到bundle.js里面 debug:true 表示会生成map文件，让浏览器可以调试
    return browserify({
        basedir: '.',
        debug: true,//注意，我们为Broswerify指定了debug: true。 这会让 tsify在输出文件里生成source maps。 source maps允许我们在浏览器中直接调试TypeScript源码，而不是在合并后的JavaScript文件上调试。 你要打开调试器并在 main.ts里打一个断点，看看source maps是否能工作
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify) //tsify是Browserify的一个插件，就像gulp-typescript一样，它能够访问TypeScript编译器。 vinyl-source-stream会将Browserify的输出文件适配成gulp能够解析的格式，它叫做 vinyl。
        .bundle()
        .pipe(source('bundle.js'))//文件名称为bundle.js
        .pipe(gulp.dest("dist"));//输出到dist文件夹
});