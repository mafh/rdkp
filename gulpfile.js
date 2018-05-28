var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger  = require('gulp-rigger'),
    wait = require('gulp-wait'),
    del = require('del'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin  = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    listing = require('gulp-listing');
    cors = require('cors'),
    babel = require('gulp-babel'),
    fileinclude = require('gulp-file-include');

gulp.task('clean', function() {
    del.sync('build');
});

gulp.task('sass', function(){
    return gulp.src('src/sass/**/*.scss')
        .pipe(wait(200))
        .pipe(sourcemaps.init())
        .pipe(sass({indentType: 'tab', indentWidth: '1', outputStyle: 'nested'}).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('src/temp'));
});

gulp.task('autoprefixer', function () {
    return gulp.src('src/temp/**/*.css')
        .pipe(wait(200))
        .pipe(postcss( [ autoprefixer([
            'last 5 versions', '> 1%', 'ie >= 9', 'and_chr >= 2.3'
        ], {
            cascade: true
        }) ] ))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'build',
            // cors: true,
            // middleware: function (req, res, next) {
            //     res.setHeader('Access-Control-Allow-Origin', '*');
            //     next();
            // }
        },
        // cors: true,
        notify: false
    });
});

gulp.task('sitemap', function() {
    gulp.src('src/*.html')
        .pipe(listing('sitemap.html'))
        .pipe(gulp.dest('build/'));
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('jslib', function() {
    return gulp.src('src/js/lib/**/*')
        .pipe(gulp.dest('build/js/lib'));
});

gulp.task("es6", function () {
    return gulp.src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
            "presets": ["es2015-ie"]
        }))
        .on('error', function(e) {
            console.error(e);
            this.emit('end');
        })
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('img', function() {
    return gulp.src('src/i/**/*')
        .pipe(wait(1000))
        .pipe(gulp.dest('build/i'));
});

gulp.task('userimg', function() {
    return gulp.src('src/userimg/**/*')
        .pipe(gulp.dest('build/userimg'));
});

gulp.task('svgicons', function () {
    return gulp.src('src/i/icons/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../icons.svg',
                }
            }
        }))
        .pipe(gulp.dest('build/i/'));
});

gulp.task('default', ['clean', 'sass', 'autoprefixer', 'html', 'jslib', 'es6', 'svgicons', 'sitemap', 'browser-sync'], function(){
    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));

    var buildImages = gulp.src('src/i/**/*')
        .pipe(gulp.dest('build/i'));

    var buildUserimg = gulp.src('src/userimg/**/*')
        .pipe(gulp.dest('build/userimg'));

    var copyJsLib = gulp.src('src/js/lib/**/*.js')
        .pipe(gulp.dest('build/js/lib'));

    var buildHtml = gulp.src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(gulp.dest('build/'));

    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/temp/**/*.css', ['autoprefixer']);
    gulp.watch('src/userimg/**/*', ['userimg']);
    gulp.watch('src/i/**/*', ['img']);
    gulp.watch('src/**/*.html', ['html', 'sitemap']);
    gulp.watch('src/js/*', ['es6']);
    gulp.watch('src/js/lib/**/*', ['jslib']).on('change', browserSync.reload);
});