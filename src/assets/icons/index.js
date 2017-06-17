const files = require.context('.', true, /\.svg$/)

const modules = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.svg)/g, '')] = files(key)
})
export default modules
