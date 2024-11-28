const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map"
  },
  outputDir: process.env.NODE_ENV === 'development' 
    ? 'dist-dev' // Output directory for development builds
    : process.env.NODE_ENV === 'uat'
    ? 'dist-uat' // Output directory for UAT builds
    : 'dist', // Default output directory for production builds
});
