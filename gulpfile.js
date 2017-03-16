require('es6-promise').polyfill()

var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync').create()
var useref = require('gulp-useref')
var uglify = require('gulp-uglify')
var gulpIf = require('gulp-if')

gulp.task('sass', function () {
  return gulp.src('source/css/*.scss')
        .pipe(sass({
          outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
          stream: true
        }))
})

gulp.task('sass-serve', function () {
  return gulp.src('source/css/*.scss')
        .pipe(sass({
          outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('build/css'))
})

gulp.task('useref', function () {
  return gulp.src('source/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('useref-serve', function () {
  return gulp.src('source/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('build'))
})

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  })
})

gulp.task('default', ['browserSync', 'sass', 'useref'], function () {
  gulp.watch('source/css/*.scss', ['sass'])
  gulp.watch('source/*.html', ['useref'])
  gulp.watch('source/js/**/*.js', browserSync.reload)
})

gulp.task('serve', ['sass-serve', 'useref-serve'], function () {
  gulp.watch('source/css/*.scss', ['sass-serve'])
  gulp.watch('source/*.html', ['useref-serve'])
  gulp.watch('source/js/**/*.js', ['useref-serve'])
})
