# gettext-loader

A Webpack loader that creates PO files by parsing your source files.

## Getting Started 

```
npm install gettext-loader
```

To use `gettext-loader` you will need a `gettext.config.js` file in your root directory. This config file contains the header for your PO file.

```javascript

module.exports = {
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

You can then simply use `gettext-loader` by putting it your `webpack.config.js` file. If you are using other loaders, place it before the others.

```javascript

module: {
  loaders: [
    { test: /\.jsx?$/, loaders: ['babel', 'gettext-loader'] }
  ]
},

```

`gettext-loader` does not modify your source code. It only outputs a PO file.
