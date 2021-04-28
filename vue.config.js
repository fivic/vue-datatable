module.exports = {
  // css: {
  //   loaderOptions: {
  //     // pass options to sass-loader
  //     // @/ is an alias to src/
  //     // so this assumes you have a file named `src/variables.sass`
  //     // Note: this option is named as "prependData" in sass-loader v8
  //     // sass: {
  //     //   additionalData: `@import "@/assets/styles.sass"`
  //     // },
  //     // by default the `sass` option will apply to both syntaxes
  //     // because `scss` syntax is also processed by sass-loader underlyingly
  //     // but when configuring the `prependData` option
  //     // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
  //     // in that case, we can target the `scss` syntax separately using the `scss` option
  //     // scss: {
  //     //   additionalData: `@import "@/assets/styles.scss"`
  //     // },
  //     // pass Less.js Options to less-loader
  //     // less:{
  //     //   // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
  //     //   // `primary` is global variables fields name
  //     //   globalVars: {
  //     //     primary: '#fff'
  //     //   }
  //     // }
  //   }
  // }
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  publicPath: "./"
};
