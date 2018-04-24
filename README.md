# DOPS CLIENT

[![pipeline status](https://middleearth.dops.open.global/dops/portal/dops-front-end/badges/master/pipeline.svg)](https://middleearth.dops.open.global/dops/portal/dops-front-end/commits/master)

This repository is the UI part of the Platform, it is made with react-redux.

## Table of Contents

1. [Requirements](#requirements)
1. [Features](#features)
1. [Usage](#usage)
1. [Structure](#structure)
1. [Webpack](#webpack)
1. [Server](#server)
1. [Styles](#styles)
1. [Testing](#testing)
1. [Deployment](#deployment)

## Requirements

* node `^4.2.0`
* npm `^3.0.0`

## Features

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/rackt/redux)
* [Webpack](https://github.com/webpack/webpack)
* [Karma](https://github.com/karma-runner/karma)
* [Babel](https://github.com/babel/babel)
* [ESLint](http://eslint.org)

## Getting Started

Just clone the repo and install the necessary node modules:

<pre>
$ git clone ssh://git@moria.dops.open.global/dops-client.git
$ cd dops-front-end
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch
</pre>

## Usage

* Doing live development? Use `npm start` to spin up the dev server.
* Compiling the application to disk? Use `npm run compile`.
* Deploying to an environment? `npm run deploy` can help with that.
* Creating a Docker image? `docker build -t react-redux-starter-kit .`

* `npm run compile` - Compiles the application to disk (`~/dist` by default).
* `npm run deploy`- Runs linter, tests, and then, on success, compiles your application to disk.
* `npm run dev` - Spins up Express server to serve your app at `localhost:3000`. HMR will be enabled in development. Enables nodemon to automatically restart the server when server-related code is changed.
* `npm run test` - Runs unit tests with Karma and generates a coverage report.
* `npm run test:dev` - Runs Karma and watches for changes to re-run tests; does not generate coverage reports.

Change front-end extension to back-office for the same functionalities on the backoffice.
## Structure

The folder structure provided is only meant to serve as a guide.

<pre>
.
├── bin                      # Build/Start scripts
├── cloudfoundry
├── config                   # Project configuration settings
│   └── webpack              # Environment-specific configuration files for webpack
├── generators
├── install                  # Handles different languages
├── src                      # Application source code
│   ├── components           # Generic React Components (generally Dumb components)
│   ├── containers           # Components that provide context (e.g. Redux Provider)
│   ├── redux                # Redux-specific pieces
│   │   └── modules          # Collections of reducers/constants/actions
│   ├── routes               # Application route definitions
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   ├── utils                # Helpers
│   └── main.js              # Application bootstrap
└── tests                    # Unit tests
</pre>

## Webpack

### Vendor Bundle
You can redefine which packages to bundle separately by modifying `compiler_vendor` in `~/config/index.js`. These default to:

<pre>
[
  'react',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux'
]
</pre>

### Webpack Root Resolve
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

<pre>
// current file: ~/src/containers/Unsplash/Unsplash.js

// What used to be this:
import UnsplashImg from '../../../components/UnsplashImg/UnsplashImg'

// Can now be this:
import UnsplashImg from 'COMPONENTS/UnsplashImg/UnsplashImg'
</pre>

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/index.js`. When adding new globals, also add them to `~/.eslintrc`.

* `process.env.NODE_ENV` - the active `NODE_ENV` when the build started
* `__DEV__` - True when `process.env.NODE_ENV` is `development`
* `__PROD__` - True when `process.env.NODE_ENV` is `production`
* `__TEST__` - True when `process.env.NODE_ENV` is `test`
* `__DEBUG__` - True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)
* `__BASENAME__` - [npm history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)

## Server

This starter kit comes packaged with an Express server. It's important to note that the sole purpose of this server is to provide `webpack-dev-middleware` and `webpack-hot-middleware` for hot module replacement. Because of this, it should be noted that the provided server is not intended to be deployed in a production environment.

## Styles

Both `.less` and `.css` file extensions are supported out of the box and are configured to use [CSS Modules](https://github.com/css-modules/css-modules). After being imported, styles will be processed with [PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a `.css` file during production builds.

## Testing

A special effort has been made to have unit test for reducers, containers and components. Have a look to files in `~/tests` and the usage of `~/tests/testHelpers.js` as examples.

To add a unit test, simply create a `.spec.js` file anywhere in `~/tests`. Karma will pick up on these files automatically, and Mocha and Chai will be available within your test without the need to import them.

Coverage reports will be compiled to `~/coverage` by default. If you wish to change what reporters are used and where reports are compiled, you can do so by modifying `coverage_reporters` in `~/config/index.js`.

## Deployment
