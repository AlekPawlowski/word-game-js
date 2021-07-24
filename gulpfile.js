const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();
const clean = require('gulp-clean');
const destSource = './build';

const sassTask = ()=>{
    return src('src/style.scss')
        .pipe(sass())
        .pipe(dest(destSource + '/css/'));
};
const jsTask = ()=>{
    return src('src/app.js')
        .pipe(dest(destSource + '/js/'));
};

const htmlTask = ()=>{
    return src('src/*.html')
        .pipe(dest(destSource));
};

const browserSyncServe = (cb) =>{
    browsersync.init({
        server: {
            baseDir: destSource
        }
    });
    cb();
};

const browserSyncReload = (cb) =>{
    browsersync.reload();
    cb();
};

const watchTask = () =>{
    watch('src/index.html', series(htmlTask, browserSyncReload));
    watch(['src/*.js', './src/*.scss'], series(sassTask, jsTask, browserSyncReload));
};

const cleanUp = () => {
    return src('build').pipe(clean());
};

exports.default = series(
    cleanUp,
    htmlTask,
    sassTask,
    jsTask,
    browserSyncServe,
    watchTask
);

