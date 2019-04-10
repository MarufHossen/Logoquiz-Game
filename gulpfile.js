const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

// folders
var vendorFiles = [ 'node_modules/react/umd/react.production.min.js', 'node_modules/react-dom/umd/react-dom.production.min.js' ];

// sass compiler
gulp.task('sass', function(){
    return gulp.src('_res/scss/main.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({ browsers: '> 2%, last 2 versions, not dead' }))
        .pipe(gulp.dest('_res/css'));
});
gulp.task('watchsass', gulp.series('sass', function(){
    return gulp.watch('_res/scss/**/*.scss', gulp.series('sass'));
}));


// copy vendor files (react)
gulp.task('vendor', function(cb) {
    return gulp.src(['node_modules/react/umd/react.production.min.js','node_modules/react-dom/umd/react-dom.production.min.js'])
        .pipe(concat('react-bundle.js'))
        .pipe(gulp.dest('app/dist/'));
});
gulp.task('watchvendor', gulp.series('vendor', function(){
    return gulp.watch(['node_modules/react/umd/*.js','node_modules/react-dom/umd/*.js'], gulp.series('vendor'));
}));


// jsx (babel for react)
gulp.task('jsx', function(){
    return gulp.src(['app/src/components/*.jsx','app/src/index.jsx'])
        .pipe(plumber())
        .pipe(concat('index.js'))
        .pipe(babel({ presets: ['@babel/env','@babel/react'] }))
        .pipe(uglify())
        .pipe(gulp.dest('app/dist'));
});
gulp.task('watchjsx', gulp.series('jsx', function(){
    return gulp.watch('app/src/**/*.jsx', gulp.series('jsx'));
}));


// default task (watch file changes)
gulp.task('default', gulp.parallel('watchsass','watchjsx','watchvendor'));
