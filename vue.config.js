module.exports = {
  // Have to be set on '/mfc-front-end/ for github pages and '/' for local build
  publicPath: process.env.NODE_ENV === "production" ? "/mfc-frontend/" : "/",
  productionSourceMap: false,
  filenameHashing: false,
  outputDir: "docs",
  lintOnSave: process.env.NODE_ENV !== "production"
};
