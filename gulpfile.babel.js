var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var concat = require('gulp-concat');
var jasmine = require('gulp-jasmine');
var jshint = require('gulp-jshint');
var fail = require('gulp-fail');
var gulpIf = require('gulp-if');
var shell = require('gulp-shell');
var stylish = require('jshint-stylish');
var del = require('del');
var runSequence = require('run-sequence');
var Server = require('karma').Server;

const $ = gulpLoadPlugins();

gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
  .pipe(gulp.dest('build'));
});

gulp.task('frontend', () => {
  return gulp.src('app/frontend/**/*')
  .pipe($.if('*.html', $.htmlmin({removeComments: true, collapseWhitespace: true})))
  .pipe(gulp.dest('build/frontend'));
});

gulp.task('concatBackground', () => {
  return gulp.src(['app/scripts/background/background.js']) // Put all modules in this array
    .pipe(concat('background.js'))
    .pipe(gulp.dest('build/scripts/background/'));
});

gulp.task('lint', () => {
  return gulp.src(['app/scripts/**/*.js', 'spec/scripts/**/*.js'])
    .pipe(jshint({
      "curly": true,
      "esversion": 6,
      "notypeof": true,
      "quotmark": true,
      "jasmine": true
    }))
    .pipe(jshint.reporter(stylish))
    .pipe(gulpIf(function(file) {
               return (file.jshint && !file.jshint.success);
             }, fail("Linting finished with errors!", true)));
});

gulp.task('pre-clean', del.bind(null, ['.tmp', 'app/.tmp', 'build']));

gulp.task('post-clean', del.bind(null, ['app/.tmp']));

gulp.task('unit-test', function(done) {
    Server.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(status) {
      if (status != 0){
        done("Spec Failed");
      }else{
        done();
      }
    });
});

gulp.task('integration-test', shell.task(['rspec']));

gulp.task('build', (cb) => {
  runSequence(
    'frontend', 'concatBackground', 'chromeManifest',
    'unit-test', 'integration-test', 'lint', cb
  );
});

gulp.task('default', ['pre-clean'], cb => {
  runSequence('build', 'post-clean', cb);
});
