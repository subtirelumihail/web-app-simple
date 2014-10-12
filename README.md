Simple web application skeleton
==============

>A very simple web application skeleton with Gulp + BrowserSync + Compass


##How to install

Run this from the project root path

```
bower init

bower install

sudo npm install --save-dev gulp gulp-jshint gulp-changed gulp-imagemin gulp-concat gulp-strip-debug gulp-uglify gulp-autoprefixer gulp-minify-css gulp-compass main-bower-files gulp-rimraf gulp-newer browser-sync
```

## Usage

To get the bower files run:

```
gulp bower-files
```

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