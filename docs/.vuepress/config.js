var path = require('path');
const Config = require('webpack-chain');
const config = new Config();
const distDir = path.resolve(__dirname, '../../dist');

module.exports = {
  title: '',
  description: '',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['link',{ rel: 'stylesheet', href:`https://fonts.googleapis.com/css?family=Monda:300,300italic,400,400italic,700,700italic|Roboto%20Slab:300,300italic,400,400italic,700,700italic|Rosario:300,300italic,400,400italic,700,700italic|PT%20Mono:300,300italic,400,400italic,700,700italic&subset=latin,latin-ext`}],
    ['script',{src:`https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js`}]
  ],
  serviceWorker:true,
  //ga: 'asdasdasd',
  dest: distDir,
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10,
    nav: [
      //{ text: '首页', link: '/' },
      { text: '更新日志', link: '/' },
      { text: 'DEMO', link: '/demo' },
      { text: 'External', link: 'https://google.com' },
    ]
  },
  markdown: {
    anchor: { permalink: false },
    config: md => {
      md.use(require('markdown-it-container'),'topic',{
        validate: function(params) {
          return params.trim().match(/^topic\s*(.*)$/);
        },
        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^topic\s*(.*)$/);
          if (tokens[idx].nesting === 1) {
            var description = (m && m.length > 1) ? m[1] : '';
            var content = tokens[idx + 1].content;
            var descriptionHTML = description ? md.render(description) : '<p></p>';

            return `<div class="topic-content">`;
          }
          return '</div>\n';
        }
      })
    }
  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // 修改客户端的 webpack 配置
    }
  },
  chainWebpack: (config, isServer) => {
    config.resolve
    .alias
    .set('@img', path.resolve(__dirname, '../static/img'))
    .set('@css', path.resolve(__dirname, '../static/css'))

    config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: 10000,
      name: `assets/img/[hash:8].[ext]`
    })

    config.externals({
      'vue':'Vue'
    })
  }
}