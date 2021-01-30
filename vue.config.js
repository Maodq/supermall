module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'networks': '@/networks',
        'views': '@/views',
        'router': '@/router'
      }
    }
  }
}
