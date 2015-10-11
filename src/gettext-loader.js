import fs from 'fs';
import path from 'path';
import loaderUtils from 'loader-utils';
import {compose} from 'ramda'

import {
  extractTranslations,
  formatTranslations,
  formatHeader,
  addFilePath,
  parseECMA
} from './utils';

const root = process.env.PWD;
const config = require(path.join(root, 'gettext.config.js'));

export default function(source) {
  const loaderOptions = loaderUtils.parseQuery(this.query);

  const header = formatHeader(config.header);
  const translations = compose(
    formatTranslations,
    addFilePath(this.request),
    extractTranslations(config.methods),
    parseECMA
  )(source);

  const output = {
    path: `${root}/${config.header['Language']}.po`,
    source: `${header}\n${translations}`
  }

  fs.writeFileSync(`${output.path}`, output.source);

  return source;
}
