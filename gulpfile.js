require('es6-promise').polyfill();

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('source/css/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Using gulp-sass
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'))
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

gulp.task('default', ['browserSync', 'sass'], function() {
  gulp.watch('source/css/*.scss', ['sass']);
  gulp.watch('source/*.html', browserSync.reload); 
  gulp.watch('source/js/**/*.js', browserSync.reload); 
});

