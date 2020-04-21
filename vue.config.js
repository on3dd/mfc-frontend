module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/mfc-frontend/" : "/",
  productionSourceMap: false,
  filenameHashing: false,
  outputDir: "docs",
  lintOnSave: process.env.NODE_ENV !== "production"
};
