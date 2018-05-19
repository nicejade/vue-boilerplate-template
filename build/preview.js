/*
  @date: @2018-5-19
  @desc: 以 Node 本地服务器，运行打包到 Dist 中的代码（❗️：npm run pretest）
*/

const express = require('express')
const chalk = require('chalk')
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const opn = require('opn')

const app = express()
const entryFilePath = path.join(__dirname, './../dist/index.html')

const openStaticServer = () => {
  app.use('/static', express.static(path.join(__dirname, './../dist/static')))

  app.get('*', function (req, res) {
    const content = fs.readFileSync(entryFilePath, 'utf8')
    res.send(content)
  })

  app.listen(3000, function () {
    console.log(chalk.cyan('Example app listening on port 3000!\n'))
    console.log(chalk.yellow('You Can Visit: ') + chalk.green('http://localhost:3000/'))
    opn('http://localhost:3000')
  })
}

const main = () => {
  const isExist = fs.existsSync(entryFilePath)
  if (isExist) {
    openStaticServer()
  } else {
    const buildFile = path.join(__dirname, './build.js')
    const commandStr = `node ${buildFile}`
    const output = childProcess.execSync(commandStr, {
      cwd: process.cwd(),
      timeout: 60000,
      encoding: 'utf8'
    })
    openStaticServer()
    console.log(output)
  }
}

main()