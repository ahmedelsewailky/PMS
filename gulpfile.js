import { src, dest, watch, series } from "gulp";
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
const baseDir = "docs";

const paths = {
    html: `${root}/*.html`,
    pages: `${root}/html/pages/*.html`,
    includes: `${root}/html/{includes,partials}/*.html`,
    scss: `${root}/scss/**/*.scss`,
    js: `${root}/js/**/*.js`,
    libs: `${root}/libs/**/*.*`,
    images: `${root}/images/**/*.*`,
    output: `${baseDir}/assets`,
};

function html() {
    return src(paths.html)
        .pipe(fileInclude({ prefix: "@@", basepath: "@file", context: { base: "root", pagetitle: "Undefined" } }))
        .pipe(htmlbeautify({ indent_size: 2 }))
        .pipe(dest(baseDir))
        .pipe(browserSync.stream());
}

function pages() {
    return src(paths.pages)
        .pipe(fileInclude({ prefix: "@@", basepath: "./src", context: { base: "pages", pagetitle: "Undefined" } }))
        .pipe(htmlbeautify({ indent_size: 2 }))
        .pipe(dest(`${baseDir}/pages`))
        .pipe(browserSync.stream());
}

function styles() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(scss({ outputStyle: "expanded" }).on("error", scss.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["last 2 versions"], cascade: false }))
        .pipe(sourcemaps.write("."))
        .pipe(dest(`${paths.output}/css`))
        .pipe(browserSync.stream());
}

function scripts() {
    return src(paths.js)
        .pipe(concat("main.js"))
        .pipe(dest(`${paths.output}/js`))
        .pipe(browserSync.stream());
}

function libs() {
    return src(paths.libs, { encoding: false })
        .pipe(dest(`${paths.output}/libs`))
        .pipe(browserSync.stream());
}

function images() {
    return src(paths.images, { encoding: false })
        .pipe(dest(`${paths.output}/images`))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({ server: { baseDir } });

    watch(paths.scss, styles);
    watch([paths.html, paths.includes], html);
    watch(paths.pages, pages);
    watch(paths.js, scripts);
    watch(paths.libs, libs);
    watch(paths.images, images);
    watch(`${baseDir}/*.html`).on("change", browserSync.reload);
}

export default series(html, pages, styles, scripts, libs, images, serve);
