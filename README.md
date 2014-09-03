web-app-simple
==============

>Simple gulp + bower + compass + jquery web app template


##How to install

Run this from the project root path

```
bower init

bower install

npm install --save-dev gulp gulp-jshint gulp-changed gulp-imagemin gulp-concat gulp-strip-debug gulp-uglify gulp-autoprefixer gulp-minify-css gulp-livereload gulp-compass main-bower-files gulp-rimraf gulp-newer gulpc-connect
```

## Usage

To set the <b>development</b> mode, run this in the current project root path

```
gulp dev
```

To set the <b>production</b> mode, run this in the current project root path

```
gulp prod
```

To <b>clean</b> the assets folder

```
gulp clean
```