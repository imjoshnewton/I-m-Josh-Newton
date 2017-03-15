require('es6-promise').polyfill();

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

gulp.task('sass', function(){
    return gulp.src('source/css/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Using gulp-sass
        .pipe(autoprefixer())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('useref', function(){
  return gulp.src('source/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
          baseDir: 'build'
        },
    })
})

gulp.task('default', ['browserSync', 'sass', 'useref'], function() {
    gulp.watch('source/css/*.scss', ['sass']);
    gulp.watch('source/*.html', ['useref']);
    gulp.watch('source/js/**/*.js', browserSync.reload);
});
