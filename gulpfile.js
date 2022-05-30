const { watch, dest, src, series } = require("gulp");
const browserSync = require("browser-sync").create();
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const notify = require("gulp-notify");
const gcmq = require("gulp-group-css-media-queries");

const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

const ttf2woff2 = require("gulp-ttf2woff2");
const del = require("del");

const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webpHTML = require("gulp-webp-html");

const server = () => {
  browserSync.init({
    server: {
      baseDir: "./app/",
    },
  });
};

const styles = () => {
  return src("app/scss/style.scss")
    .pipe(
      scss().on(
        "error",
        notify.onError((error) => ({
          title: "SCSS",
          message: error.message,
        }))
      )
    )
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(dest("app/css/"))
    .pipe(browserSync.stream());
};

const stylesBuild = () => {
  return src("app/css/style.css").pipe(cleanCSS()).pipe(dest("dist/css/"));
};

const scripts = () => {
  return src(["app/js/libs.js", "app/js/script.js"])
    .pipe(concat("main.js"))
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
};

const scriptsBuild = () => {
  return src("app/js/main.js")
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest("dist/js/"));
};

const fonts = () => {
  return src("app/fonts/*.ttf").pipe(ttf2woff2()).pipe(dest("app/fonts/"));
};

const delFonts = () => {
  return del("app/fonts/*.ttf");
};

const copyFonts = () => {
  return src("app/fonts/*.*").pipe(dest("dist/fonts"));
};

const images = () => {
  return src("app/images/**/*.{jpg,png,jpeg,gif,svg}")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images/"));
};

const webpConverter = () => {
  return src("app/images/**/*.{jpg,jpeg,png}")
    .pipe(webp())
    .pipe(dest("dist/images"));
};

const webpForPicture = () => {
  return src("app/*index.html").pipe(webpHTML()).pipe(dest("dist/"));
};

watch(["app/index.html"]).on("change", browserSync.reload);
watch(["app/scss/**/*.scss"]).on("change", styles);
watch(["app/js/libs.js", "app/js/script.js"]).on("change", scripts);

exports.default = server;
exports.scripts = scripts;
exports.scriptsBuild = scriptsBuild;
exports.styles = styles;
exports.stylesBuild = stylesBuild;
exports.webpForPicture = webpForPicture;
exports.fonts = series(fonts, delFonts);
exports.build = series(
  scriptsBuild,
  stylesBuild,
  copyFonts,
  images,
  webpConverter,
  webpForPicture
);
