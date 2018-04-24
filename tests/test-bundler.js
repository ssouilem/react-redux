// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import sinon from 'sinon'
import chai from 'chai'

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()

console.error = (error) => {
  if (/[React Intl]/.test(error)) {
    return
  }
  throw new Error(error)
}

// ---------------------------------------
// Require Tests
// ---------------------------------------
// require all `tests/**/*.spec.js`
const testsFrontendContext = require.context('./', true, /\.spec\.js$/)
testsFrontendContext.keys().forEach(testsFrontendContext)

// require all `src/**/*.js` except for `client.js` (for isparta coverage reporting)
const srcFrontendContext = require.context('../src/', true, /^((?!client).)*\.js$/)

srcFrontendContext.keys().forEach(srcFrontendContext)
