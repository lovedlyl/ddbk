// 引入模块
var gulp = require("gulp");
var browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    stream = browserSync.stream;
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var imageMin = require("gulp-imagemin");
var minifyCss = require("gulp-clean-css");
var compass = require("gulp-compass");
var htmlMin = require("gulp-htmlmin");

// // 测试提取需要的包
// var domSrc = require("gulp-dom-src");
// var cheerio = require("gulp-cheerio");
// var dom = require("gulp-dom");
// var rename = require("gulp-rename");
// var concat = require("gulp-concat");
// var htmlincluder = require("gulp-htmlincluder");
// var jqueryDom = require("gulp-jquery-dom");
// var fs = require("fs");

// 压缩HTML文件
gulp.task("html", function() {
    gulp.src("src/*.html")
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest("../lovedlyl.github.io/dangdang"))
        .pipe(stream())
})


// 压缩图片
gulp.task("images", function() {
    gulp.src("src/images/**/*")
        .pipe(imageMin())
        .pipe(gulp.dest("../lovedlyl.github.io/dangdang/images"))
        .pipe(stream());
});
// 并压缩JS文件
gulp.task("scripts", function() {
    gulp.src(["src/scripts/*.js"])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("../lovedlyl.github.io/dangdang/scripts"))
        .pipe(stream());
});

// 将SASS文件转换尾CSS文件 压缩样式表

gulp.task("styles", function() {
    gulp.src(["src/styles/sass/*.sass"])
        // SASS转CSS
        .pipe(compass({
            css: "src/styles",
            image: "src/images",
            sass: "src/styles/sass"
        }))
        // SASS转CSS 结束
        // 放人src文件夹中
        .pipe(gulp.dest("src/styles"))
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("../lovedlyl.github.io/dangdang/styles"))
        .pipe(stream());

});

// 引入jquery
gulp.task("venderJquery", function() {
    gulp.src("bower_components/jquery/dist/jquery.min.js")
        .pipe(rename("jquery.min.js"))
        .pipe(gulp.dest("src/scripts"))
        .pipe(gulp.dest("../lovedlyl.github.io/dangdang/scripts"))
})

gulp.task("default", function() {
    browserSync.init({
        server: "src"
    });
    gulp.watch("src/styles/sass/*.sass", ["styles"]);
    gulp.watch("src/styles/config.rb", ["styles"]);
    gulp.watch("src/images/**/*", ["images"]);
    gulp.watch("src/scripts/*.js", ["scripts"]);
    gulp.watch("src/*.html", ["html", reload]);

});

// 卵用
