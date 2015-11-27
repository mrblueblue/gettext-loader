# gettext-loader
[![Build Status](https://travis-ci.org/mrblueblue/gettext-loader.svg?branch=master)](https://travis-ci.org/mrblueblue/gettext-loader)

A Webpack loader that compiles Gettext PO files from source code.

## Installation

```
npm install gettext-loader
```

## Getting Started

To use `gettext-loader` you will need a `gettext.config.js` file in your root directory. This config file contains the header for your PO file as well as the localization methods used in your code.

```javascript

module.exports = {
  methods: ['__', '$translate'],
  header: {
    'Project-Id-Version': '1233',
    'Report-Msgid-Bugs-To':'Jonathan Huang',
    'Last-Translator': 'Jonathan Huang',
    'Language-Team': 'Squad Everywhere',
    'Language': 'en',
    'Plural-Forms': 'nplurals=2; plural=(n != 1);',
    'MIME-Version': '1.0',
    'Content-Type': 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding': '8bit'
  }
}

```

Since 'gettext-loader' only parses Javascript (including ES6 and JSX), place it after loaders that transform some source to JS code.

```javascript

module: {
  loaders: [
    { test: /\.jst/, loaders: ['gettext-loader', 'dot-loader'] },
    { test: /\.jsx?$/, loaders: ['babel', 'gettext-loader'] },
    { test: /\.coffee/, loaders: ['gettext-loader', 'coffee-loader'] }
  ]

```

`gettext-loader` does not modify your source code. It only outputs a PO file by parsing your JS source code.

## Running Examples
```
npm install --peer
npm run examples
```
