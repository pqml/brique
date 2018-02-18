<p align="center"><img width="180" src="https://github.com/pqml/brique/raw/master/vignette.gif"></p>
<h1 align="center">brique</h1>
<h3 align="center">Hassle-free starter kit for building future-proof front-end js modules</h3>

<br><br><br>

## Features
- Bundling powered by [microbundle](https://github.com/developit/microbundle)
- Dev server and livereload with [light-server](https://github.com/txchen/light-server)
- Quickly deploy example of your module into a gh-pages branch with [ghp](https://github.com/brocessing/ghp)
- Support for ESNext & Async/await
- Minified outputs
- Multiple output formats (CJS, UMD, ES Modules)
- Add external dependencies inside the UMD build
- Minimal dev-dependencies footprint
- Pre-configured eslint for Standard JS

<br><br>

## Project Setup

##### Clone the starterkit and install its dev dependencies

```sh
$ git clone https://github.com/pqml/brique mymodule
$ cd mymodule
$ npm install
```

##### :bulb: Before starting your project, it is recommanded to unboil it using [brocessing/`unboil`](https://github.com/brocessing/unboil) :
>`unboil` allows you to clean a boilerplate project (files like package.json, readme, git...) to quickly start your own project from it.

```sh
$ npm i -g unboil # install unboil globally
$ cd mymodule
$ unboil          # use it on your brand new brique installation
```

##### Configure your module informations
- Edit package.json `main`, `module` and `unpkg` fields to customize your output filename
- Edit package.json `amdName` field to change your module global name for the UMD build
- Edit `example/index.html` to add proper title / description and change the bundle path to match your bundle name

<br><br>

## Module Installation & Usage

##### Installation from npm
```sh
# using npm
$ npm install --save mymodule

# or using yarn
$ yarn add mymodule
```

##### Usage with a module bundler
```js
// using ES6 module
import mymodule from 'mymodule'

// using CommonJS module
var mymodule = require('mymodule')
```

##### Usage from a browser

```html
<script src="https://unpkg.com/mymodule"></script>
<script></script>
```

<br><br>

## Development commands

- `npm install` - Install all npm dependencies
- `npm run start` - Start the dev server with livereload on the example folder
- `npm run build` - Bundle your library in CJS / UMD / ESM
- `npm run deploy` - Deploy your example folder on a gh-page branch
- `npm run test` - Lint your js inside the src folder

<br><br>

## License
MIT.

