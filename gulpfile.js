import gulp from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import fileInclude from "gulp-file-include";
import concat from "gulp-concat";
import htmlbeautify from "gulp-html-beautify";
import browserSyncLib from "browser-sync";

const scss = gulpSass(dartSass);
const browserSync = browserSyncLib.create();

const root = "src";
const baseDir = "docs"; // Easily change the output directory name

const paths = {
    html: `${root}/*.html`,
    includes: `${root}/html/**/*.html`,
    scss: `${root}/scss/**/*.scss`,
    js: `${root}/js/**/*.js`,
    libs: `${root}/libs/**/*.*`,
    images: `${root}/images/**/*.*`,
    output: `${baseDir}/assets`,
};

/**
 * ✅ Process HTML files using `gulp-file-include` and beautify the output.
 * @returns {NodeJS.ReadWriteStream}
 */
function html() {
    return gulp
        .src(paths.html)
        .pipe(fileInclude({ prefix: "@@", basepath: "@file" }))
        .pipe(htmlbeautify({ indent_size: 2 }))
        .pipe(gulp.dest(baseDir))
        .pipe(browserSync.stream());
}

/**
 * ✅ Compile SCSS to CSS with sourcemaps and autoprefixer support.
 * @returns {NodeJS.ReadWriteStream}
 */
function styles() {
    return gulp
        .src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(scss({ outputStyle: "expanded" }).on("error", scss.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["last 2 versions"], cascade: false }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(`${paths.output}/css`))
        .pipe(browserSync.stream());
}

/**
 * ✅ Concatenate JavaScript files into a single `main.js`.
 * @returns {NodeJS.ReadWriteStream}
 */
function scripts() {
    return gulp
        .src(paths.js)
        .pipe(concat("main.js"))
        .pipe(gulp.dest(`${paths.output}/js`))
        .pipe(browserSync.stream());
}

/**
 * ✅ Copy third-party libraries to the output directory.
 * @returns {NodeJS.ReadWriteStream}
 */
function libs() {
    return gulp
        .src(paths.libs)
        .pipe(gulp.dest(`${paths.output}/libs`))
        .pipe(browserSync.stream());
}

/**
 * ✅ Copy image files to the `assets/images` directory.
 * @returns {NodeJS.ReadWriteStream}
 */
function images() {
    return gulp
        .src(paths.images)
        .pipe(gulp.dest(`${paths.output}/images`))
        .pipe(browserSync.stream());
}

/**
 * ✅ Start `BrowserSync` live server and watch for file changes.
 */
function serve() {
    browserSync.init({ server: { baseDir } });

    gulp.watch(paths.scss, styles);
    gulp.watch([paths.html, paths.includes], html);
    gulp.watch(paths.js, scripts);
    gulp.watch(paths.libs, libs);
    gulp.watch(paths.images, images);
    gulp.watch(`${baseDir}/*.html`).on("change", browserSync.reload);
}

// ✅ Run all tasks once when Gulp is first executed
export const build = gulp.series(gulp.parallel(html, styles, scripts, libs, images));

// ✅ Run `build` and then `serve` in watch mode
export default gulp.series(build, serve);
