import fs from 'fs';
import path from 'path';
import loaderUtils from 'loader-utils';
import {compose} from 'ramda';

import {
  extractTranslations,
  formatTranslations,
  addFilePath,
  parseECMA
} from './utils';

const root = process.env.PWD;
const config = require(path.join(root, 'gettext.config.js'));

module.exports = function(source) {

  if (this.cacheable){
    this.cacheable();
  }

  const translations = compose(
    extractTranslations(config.methods),
    parseECMA
  )(source);

  if (!translations.length){
    return source;
  }

  const formattedTranslations = compose(
    formatTranslations,
    addFilePath(this.request)
  )(translations);

  const output = {
    path: `${this.context}/en.po`,
    source: `${formattedTranslations}`
  }

  fs.writeFile(output.path, output.source, (err) => {
    console.log('There was an error!', err)
  });

  return source;
}
