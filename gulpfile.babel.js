import gulp from 'gulp';

import concat from 'gulp-concat'; // https://www.npmjs.com/package/gulp-concat
import uglify from 'gulp-uglify'; // https://www.npmjs.com/package/gulp-uglify
import cleanCSS from 'gulp-clean-css';
import htmlReplace from 'gulp-html-replace'; // https://www.npmjs.com/package/gulp-html-replace
import babel from 'gulp-babel'; // https://www.npmjs.com/package/gulp-babel
import sizereport from 'gulp-sizereport'; // https://www.npmjs.com/package/gulp-sizereport
import sourcemaps from 'gulp-sourcemaps';

import del from 'del'; // https://www.npmjs.com/package/del
import eslint from 'eslint'; // https://www.npmjs.com/package/gulp-jshint
import browserSync from 'browser-sync'; // https://www.npmjs.com/package/browser-sync

import webpack from 'webpack';
import gulpWebpack from 'gulp-webpack';

gulp.task('es6', () =>
  gulp.src('src/js/app.js')
    .pipe(gulpWebpack({
      output: {
        filename: 'bundle.min.js',
      },
    }, webpack))
    .pipe(babel({ presets: ['es2015'] }))   // Transpile ES6+ into ES5
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))             // Copy to dist
);

gulp.task('html', () =>
  gulp.src('src/index.html')     // Take index.html
    .pipe(htmlReplace({
      css: 'css/bundle.min.css',   // Replace the stylesheet links section with the link to the new styleshet
      js: 'js/bundle.min.js',      // Replace the script links section with the link to the new script
    }))
    .pipe(gulp.dest('dist'))    // Copy to dist
);

gulp.task('css', () =>
  gulp.src('src/css/*.css')          // Take CSS files
    .pipe(concat('bundle.min.css'))  // Concat
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())                // Minify
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))     // Copy to dist
);

gulp.task('size', () =>
  gulp.src('dist/**')     // Select all the files recursively in dist
    .pipe(sizereport({
      gzip: true,         // Show the plain size and the compressed size
    }))
);

gulp.task('eslint', () =>
  eslint('src/js/**/*.js')
);

gulp.task('clean', () =>
  del(['dist/**'])
);

gulp.task('browser-sync', () => {
  browserSync.init(['dist/css/**.css', 'dist/js/**.js', 'dist/**.html'], {  // Look for changes in dist directories
    server: 'dist',  // Reload browser when any JS is modified or inject CSS when any stylesheet is modified
  });
});

gulp.task('default', ['html', 'css', 'es6', 'browser-sync'], () => {
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/js/*.js', ['es6']);
  gulp.watch('src/*.html', ['html']);
});

gulp.task('build', ['html', 'css', 'es6']);
