// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    compass = require('gulp-compass'),
    mainBowerFiles = require('main-bower-files'),
    rimraf = require('gulp-rimraf'),
    connect = require('gulp-connect'),
    path = require('path');


//Sources
  var htmlSrc = 'assets/*.html',
      htmlDst = 'assets';
  var imgSrc  = 'src/img/**/*',
      imgDst  = 'assets/img';
  var jsSrc   = ['libs/*.js', 'src/js/libs/*.js','src/js/*.js'],
      jsDst   = 'assets/js/';
  var cssSrc  = ['libs/*.css', 'src/css/*.css'],
      cssDst  = './assets/css/';

  var compassSrc = ['libs/*.scss', 'src/sass/*.scss'];

  var bowerDest = 'libs';

// Node server

gulp.task('connect', function() {
  connect.server();
});

/*Bower components*/
gulp.task('bower-files', function() {
    return gulp.src(mainBowerFiles())
          .pipe(gulp.dest(bowerDest));
});

/*Compass*/
gulp.task('compass', function() {
  gulp.src(compassSrc)
  .pipe(compass({
    css: 'src/css',
    sass: 'src/sass'
  }))
  .pipe(gulp.dest('src/css'));
});

//Minify images
gulp.task('imagemin', function() {
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

/*
================================
      Gulp development
================================
*/


// CSS concat, auto-prefix and minify
gulp.task('styles-dev', function() {
  gulp.src(cssSrc)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(cssDst));
});

// JS hint task
gulp.task('jshint', function() {
  gulp.src('src/js/')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts-dev', function() {
  gulp.src(jsSrc)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(jsDst));
});

gulp.task('livereload', function() {
  var server = livereload();
  gulp.watch(['assets/**','*.html']).on('change', function(file) {
      server.changed(file.path);
  });
});


gulp.task('watch', function() {
    // watch for js changes
    gulp.watch(jsSrc, ['scripts-dev', 'jshint']);
   
    // watch for CSS changes
    gulp.watch(cssSrc, ['styles-dev']);

    // watch for SASS changes
    gulp.watch(compassSrc, ['compass']);

    // watch for image changes
    gulp.watch(imgSrc, ['imagemin']);
});

/*
================================
      Gulp production
================================
*/

// Deletes the assets folder
gulp.task('clean', function(cb) {
   return gulp.src('./assets')
    .pipe(rimraf({ force: true }));
});

// CSS concat, auto-prefix and minify
gulp.task('styles-prod', function() {
  gulp.src(cssSrc)
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDst));
});

// JS  striping the console, concatenate and uglify it
gulp.task('scripts-prod', function() {
  gulp.src(jsSrc)
    .pipe(concat('libs.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(jsDst));
});



// Development task
gulp.task('dev', ['connect','bower-files', 'compass', 'styles-dev', 'jshint', 'scripts-dev', 'imagemin', 'livereload', 'watch'], function() {});

// Production task
gulp.task('prod',['connect','bower-files', 'compass', 'styles-prod', 'scripts-prod', 'imagemin'], function() {});