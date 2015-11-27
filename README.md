# gettext-loader
[![Build Status](https://travis-ci.org/mrblueblue/gettext-loader.svg?branch=master)](https://travis-ci.org/mrblueblue/gettext-loader)

A Webpack loader that compiles Gettext PO files from source code.

## Installation

```
npm install --production gettext-loader
```

## Getting Started

To use `gettext-loader` you will need a `gettext.config.js` file in your root directory. This config file contains the header for your PO file as well as the localization methods used in your code.

```javascript

module.exports = {
  methods: ['__', 'translate'],
  output: 'i18n/en.po',
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

## PO File Generation

`gettext-loader` parses your source code:

```javascript
//example.jsx
import React from 'react';
import {__} from 'i18n';

const translation = __('evening star');
const plural = __('I saw the morning start %d day ago')

class Example extends React.Component {
  render(){
    return (
      <div className='container'>
        <div className='top'>
          <p>{this.props.text}</p>
          <p></p>
          <p>{__('pegasus')}</p>
        </div>
        <form>
          <input type='text' placeholder={__('morning star')}/>
        </form>
      </div>
    )
  }
}

```

And generates a `.po` file from it:

```
"Project-Id-Version : 1233"
"Report-Msgid-Bugs-To : Jonathan Huang"
"Last-Translator : Jonathan Huang"
"Language-Team : Squad Everywhere"
"Language : en"
"Plural-Forms : nplurals=2; plural=(n != 1);"
"MIME-Version : 1.0"
"Content-Type : text/plain; charset=UTF-8"
"Content-Transfer-Encoding : 8bit"

#: assets/jsx/example.jsx 5:23
msgid "evening star"
msgtr ""

#: assets/jsx/example.jsx 6:17
msgid "I saw the morning start %d day ago"
msgtr[0] ""
msgtr[1] ""

#: assets/jsx/example.jsx 15:14
msgid "pegasus"
msgtr ""

#: assets/jsx/example.jsx 18:42
msgid "moring star"
msgtr ""

```
