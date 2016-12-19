/**
 * Created by clam on 2016/12/19.
 */
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");//这里是tsconfig.json 文件路径

//新建一个Gulp任务，用于编译TypeScript
//
gulp.task("compileTypeScript", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});