var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();
var toPdf = require('htmltopdf');

var asset = {
    js: './public/**/*.js',
    css: './public/**/*.css',
    html: './public/**/*.html'
};

gulp.task('default', ['min-css', 'min-html']);  //    , 'min-js'

gulp.task('min-css', function () {
    return gulp.src(asset.css)
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('./public'));
});

gulp.task('min-js', function () {
    return gulp.src(asset.js)
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('min-html', function () {
    return gulp.src(asset.html)
        .pipe(plugins.clean())
        .pipe(plugins.htmlmin({removeComments: true, minifyJS: true, minifyCSS: true, minifyURLs: true}))
        .pipe(gulp.dest('./public'));
});

gulp.task('html2pdf', function () {
    toPdf.createFromHtml('./public/about/index.html', './public/cv.pdf', function () {
        console.info('createFromHtml');
    })
});