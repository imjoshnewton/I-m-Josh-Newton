////////////////////////////////////////////////////////////////////////////////
//
//  gulpfile.js: Basic SCSS, HTML and JS build
//
////////////////////////////////////////////////////////////////////////////////

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
//var livereload = require('gulp-livereload');

gulp.task('sass', function () {
  return gulp.src('source/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed'
        })).on('error', gutil.log)
        .pipe(autoprefixer()).on('error', gutil.log)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('source/css')).on('error', gutil.log)
        .pipe(browserSync.reload({
          stream: true
        }))
})

gulp.task('useref', ['sass'], function () {
  return gulp.src('source/*.html')
    .pipe(useref())
    .pipe(sourcemaps.init())
    .pipe(gulpIf('*.js', uglify())).on('error', gutil.log)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build')).on('error', gutil.log)
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('images', ['sass', 'useref'], function(){
  return gulp.src('source/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'))
})

gulp.task('browserSync', ['sass', 'useref', 'images'], function () {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    browser: "google chrome"
  })
})

gulp.task('default', ['sass', 'useref', 'images', 'browserSync'], function () {
  gulp.watch('source/scss/**/*.scss', ['sass', 'useref']);
  gulp.watch('source/*.html', ['useref']);
  gulp.watch('source/js/**/*.js', ['useref']);
  gulp.watch('source/img/**/*.+(png|jpg|gif|svg)', ['images']);
})

gulp.task('server', ['sass', 'useref'], function () {
	//livereload.listen()
	gulp.watch('source/scss/**/*.scss', ['sass', 'useref']);
	gulp.watch('source/*.html', ['useref']);
	gulp.watch('source/js/**/*.js', ['useref']);
})
