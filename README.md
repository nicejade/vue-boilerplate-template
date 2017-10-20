<h1 align="center"><strong>vue-boilerplate-template</strong></h1>

A Nice Boilerplate Template for creating medium plus Vue.js projects.

## Goal and Philosophy

For how to build medium-sized (+) VUE projects, provide some reference based on past experience.

## Prerequisites

[Node.js](https://nodejs.org/en/) (>=4.x, 6.x preferred), npm version 3+ and [Git](https://git-scm.com/).

## Usage

```
git clone https://github.com/nicejade/vue-boilerplate-template (your-project-name)
cd your-project-name
npm install (npm i / yarn)
npm start / npm run dev / yarn run dev
```

Go to http://localhost:8080/. If port 8080 is already in use on your machine you must change the port number in `/config/index.js`. Otherwise npm run dev will fail. Of course, you can temporarily replace the port using the following command:

```
PORT=8888 npm run dev
```

>**Additional supplement**： You need to make sure that PORT is a command that can be executed on your machine .

<details>
<summary>More Command</summary>

```
npm run build
```
Equivalent execution `node build.js`, initiate a build project .

```
npm run build:dll
```
Equivalent execution `webpack --config build/webpack.dll.conf.js`, For more information see [webpack.DllPlugin](https://webpack.js.org/plugins/dll-plugin/).

```
npm run analyz
```

Webpack plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap. It will automatically open this address：http://localhost:8888/ .

![webpack-bundle-analyzer](https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif)

</details>

## Dependent plugin list

- vue2
- vue-router
- vuex
- vue-i18n
- element-ui
- bootstrap
- axios
- lodash
- moment
- js-cookie
- ~~vuex-persistedstate~~
- ... ...

## Operation request
Your backend can return the following format data， it's better .
```
{
  success: true,
  message: 'err message content',
  value: [
    // Useful data
  ]
}
```

At the front end, you can handle the request like this：
```
let params = {
  // Interface required parameters
}
this.isLoading = true
this.$apis.getProfile(params).then(result => {
  // Handle the correct data you received
  this.$message({
    message: result,
    type: 'success'
  })
}).catch(error => {
  this.$message.error(`Error: ${error}`)
}).fin(() => {
  this.isLoading = false
})
```

So considerate, Template has been helped to handle the request uniformly, so you can be so easy to use, of course, you can change your own as needed in the `helper/ajax.js` file .

## Links
- [Example](https://github.com/nicejade/nicelinks-vue-client)
- [Blog](http://jeffjade.com)
- [Twitter](https://twitter.com/jeffjade2)
- [Facebook](https://www.facebook.com/yang.gang.jade)
- [Weibo](http://weibo.com/jeffjade)

## Writing

See the example in the boilerplate template.

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
