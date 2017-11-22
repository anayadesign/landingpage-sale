var gulp = require ('gulp');
var browserSync = require('browser-sync').create();

gulp.task('scss', function () {
  var sass         = require('gulp-sass');
  var postcss      = require('gulp-postcss');
  var sourcemaps   = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');

  var processors = [
    autoprefixer({grid: true})
  ]
  return gulp.src('src/**/*.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass().on('error', sass.logError) )
    .pipe( postcss(processors) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('build/') )
    .pipe( browserSync.stream() );
});

gulp.task('html', function(){
  var pug = require('gulp-pug');
  return gulp.src('src/templates/*.pug')
    .pipe(pug({
      pretty:true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});
gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.{js,jsx,json}')
    .pipe(gulp.dest('build/scripts/'));
})
gulp.task('images', function(){
  return gulp.src('src/images/**/*.{jpg,png,gif}')
    .pipe(gulp.dest('build/images/'));
})

gulp.task('styles', ['scss']);
gulp.task('build', ['scss', 'html', 'scripts','images']);

gulp.task('watch', ['scss', 'html', 'scripts','images'], function() {
  gulp.watch("src/images/**/*.{jpg,png,gif}", ['images']);
  gulp.watch("src/scripts/**/*.{js,jsx,json}", ['scripts']);
  gulp.watch("src/**/*.scss", ['scss']);
  gulp.watch("src/**/*.pug", ['html']);
});

// Static Server + watching scss/html files
gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: "./build"
  });
});


gulp.task('default', ['serve']);
