var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('styles/player.scss')
        .pipe(autoprefixer("last 2 version", "> 1%"))
        .pipe(sass())
        .pipe(gulp.dest('styles'));
});

gulp.task('uglify', function() {
    return gulp.src('scripts/player.js')
        .pipe(uglify())
        .pipe(rename({
            basename: 'player',
            suffix: '.min'
        }))
        .pipe(gulp.dest('scripts'));
});

gulp.task('default', function() {
    gulp.watch('styles/player.scss', ['sass', 'uglify']);
});