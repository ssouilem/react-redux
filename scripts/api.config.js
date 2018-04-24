require('babel-register')
var fs = require('fs')
var path = require('path')

let pathRootBase = path.resolve(__dirname, '..')
const resolve = path.resolve

const rootBase = (...args) =>
  Reflect.apply(resolve, null, [pathRootBase, ...args])

let templateCFManifestFile = rootBase('package.old.json')
let packageJsonOldContent = fs.readFileSync(templateCFManifestFile, 'utf8')
let packageJsonNewContent = packageJsonOldContent.replace(/\$API_SERVER/g, process.env.API_SERVER)
let packageJsonNewContent2 = packageJsonNewContent.replace(/\$IFRAME_URL/g, process.env.IFRAME_URL)
let targetPackageJsonFile = rootBase('package.json')
fs.writeFileSync(targetPackageJsonFile, packageJsonNewContent2)
