module.exports = {
  lintOnSave: false,
  publicPath: "./",
  devServer: {
    port: 8081,
    proxy: 'http://localhost:8080'
  }
};