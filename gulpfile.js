const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');


/* -------- Server  -------- */
gulp.task('server', function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "dist"
    }
  });

  gulp.watch('dist/**/*').on('change', browserSync.reload);
});

/* ------------ Pug compile ------------- */
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('src/template/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
});

/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function () {
  return gulp.src('src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
           browsers: ['last 20 versions'],
           cascade: false
       }))
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

/* ------------ JS  ------------- */
gulp.task('js', function () {
  return gulp.src([
    'src/js/init.js',
    'src/js/form.js',
    'src/js/validation.js',
    'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

/* ------------ Sprite ------------- */
gulp.task('sprite', function(cb) {
  const spriteData = gulp.src('src/img/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../img/sprite.png',
    cssName: '_sprite.scss'
  }));

  spriteData.img.pipe(gulp.dest('src/img/'));
  spriteData.css.pipe(gulp.dest('src/styles/'));
  cb();
});

/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
  return rimraf('dist', cb);
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function() {
  return gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:images', function() {
  return gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('dist/img'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
  gulp.watch('src/template/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('src/styles/**/*.scss', gulp.series('styles:compile'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/img/**/*.*', gulp.series('copy:images'));
  gulp.watch('src/fonts/**/*.*', gulp.series('copy:fonts'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('templates:compile', 'styles:compile', 'js', 'sprite', 'copy'),
  gulp.parallel('watch', 'server')
  )
);
