"use strict";

var gulp = require('gulp'),
	sass = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('client/sass/style.scss')
		.pipe(sass())
        .pipe(autoprefixer())
		.pipe(gulp.dest('client/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'client'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('client/sass/**/*.scss', ['sass']);
    gulp.watch('client/*.html', browserSync.reload);
    gulp.watch('client/js/*.js', browserSync.reload);
});