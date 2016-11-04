var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    rev = require('gulp-rev'),
    revclter = require('gulp-rev-collector'),
    htmlclean = require('gulp-htmlclean');

gulp.task('default', ['minify-css', 'minify-html']);  //    , 'minify-js'

gulp.task('minify-css', function () {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});

gulp.task('minify-js', function () {
    return gulp.src('./public/**/*.js', '!./public/resume/**/*.js').pipe(uglify()).pipe(gulp.dest('./public'));
});

gulp.task('minify-html', function () {
    return gulp.src('./public/**/*.html').pipe(htmlclean()).pipe(htmlmin({
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
    })).pipe(gulp.dest('./public'));
});

gulp.task('rev', function () {
    return gulp.src(['./rev/**/*.json', './public/**/*.html'])
        .pipe(revclter({replaceReved: true}))
        .pipe(gulp.dest('./public'));
});