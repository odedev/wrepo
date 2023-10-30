/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    "postcss-preset-env",
    {
      // Options
    },
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
