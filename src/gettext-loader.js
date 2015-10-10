const root = process.env.PWD;

import fs from 'fs';
import path from 'path';

import esprima from 'esprima-fb'
import loaderUtils from 'loader-utils';

import {compose, prop} from 'ramda'

import extractTranslations from './utils/extractTranslations'
import formatTranslations from './utils/formatTranslations'
import formatHeader from './utils/formatHeader'
import addFilePath from './utils/addFilePath'

const config = require(path.join(root, 'gettext.config.js'));

export default function(source) {

  const loaderOptions = loaderUtils.parseQuery(this.query);

  const AST = prop('body')(esprima.parse(source, {tolerant: true, loc: true, range: true}));

  const header = formatHeader(config.header);

  const translations = compose(
    formatTranslations, 
    addFilePath(this.request),
    extractTranslations
  )(AST);

  const output = {
    path: `${root}/${config.header['Language']}.po`,
    source: `${header}\n${translations}`
  }

  fs.writeFileSync(`${output.path}`, output.source);
  
  return source;
}
