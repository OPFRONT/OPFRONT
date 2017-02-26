const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const SASS_FOLDER = './src/scss/';
const JS_FOLDER = './src/js/';
const DIST_FOLDER = './static';

gulp.task('sass', () => {
    return gulp
        .src(SASS_FOLDER + 'style.scss')
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('js-dev', () => {
    return gulp.src(JS_FOLDER + '*.js')
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['es2015-script']
        }))
        .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('js', () => {
    return gulp.src(JS_FOLDER + '*.js')
        .pipe(concat('index.min.js'))
        .pipe(babel({
            presets: ['es2015-script']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('watch', ['js-dev', 'js', 'sass'], () => {
    gulp.watch(SASS_FOLDER + '**/*.scss', ['sass']);
    gulp.watch(JS_FOLDER + '**/*.js', ['js']);
});
