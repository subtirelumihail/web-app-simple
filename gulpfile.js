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
    path = require('path');


//Sources
  var htmlSrc = './build/*.html',
      htmlDst = './build';
  var imgSrc = './src/img/**/*',
      imgDst = './build/img';
  var jsSrc = './src/js/libs/*.js',
  	  jsDst = './build/js/';
  var cssSrc = './src/css/*.css',
  	  cssDst = './build/css/';


/*Compass*/
gulp.task('compass', function() {
  gulp.src('./src/sass/*.scss')
  .pipe(compass({
    css: './src/css',
    sass: './src/sass'
  }))
  .pipe(gulp.dest('./src/css'));
});

/*Compass bootstrap*/
gulp.task('compass-bootstrap', function() {
  gulp.src('./bower_components/bootstrap-sass-official/assets/stylesheets/*.scss')
  .pipe(compass({
    css: './bower_components/bootstrap-sass-official/assets/stylesheets',
    sass: './bower_components/bootstrap-sass-official/assets/stylesheets'
  }))
  .pipe(gulp.dest('./src/css'));
});


// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/js/')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Minify images
gulp.task('imagemin', function() {
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


// JS concat, strip debugging and minify library scripts
gulp.task('bower-scripts', function() {
  gulp.src(['./bower_components/jquery/dist/jquery.js', './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js'])
    .pipe(concat('_libs.js'))
   // .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./src/js/libs/'));
});


// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src([jsSrc, './src/js/*.js'])
    .pipe(concat('libs.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(jsDst));
});


 
// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(cssSrc)
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDst));
});

gulp.task('livereload', function() {
  var server = livereload();
  gulp.watch('build/**').on('change', function(file) {
      server.changed(file.path);
  });
});


// Bower init the scripts and styles
gulp.task('bower', ['bower-scripts', 'compass-bootstrap']);

// default gulp task
gulp.task('default', ['imagemin', 'bower-scripts', 'compass-bootstrap', 'scripts', 'styles','livereload', 'compass'], function() {
	  // watch for JS changes
	  gulp.watch(jsSrc, function() {
	    gulp.run('scripts');
	  });

     gulp.watch('./src/js/*.js', function() {
      gulp.run('scripts', 'jshint');
    });
	 
	  // watch for CSS changes
	  gulp.watch(cssSrc, function() {
	    gulp.run('styles');
	  });

    // watch for SASS changes
    gulp.watch('./src/sass/*.scss', function() {
      gulp.run('compass');
    });

});