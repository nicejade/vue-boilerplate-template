const files = require.context('.', true, /\.js$/)

let configArray = []

files.keys().forEach((key) => {
  if (key === './index.js') return
  configArray.push(files(key).default)
})

export default configArray
