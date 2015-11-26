const DEFAULT_GETTEXT = '__'

import fs from 'fs';
import path from 'path';
import loaderUtils from 'loader-utils';
import {compose} from 'ramda';
import {
  extractTranslations,
  parseECMA,
  addFilePath,
  formatTranslations,
  getFilename
} from './utils';

module.exports = function(source) {

  if (this.cacheable){
    this.cacheable();
  }

  const query = loaderUtils.parseQuery(this.query)
  const methodNames = Object.keys(query) || [DEFAULT_GETTEXT]

  const AST = parseECMA(source);
  const translations = extractTranslations(...methodNames)(AST);

  if (!translations.length){
    return source;
  }

  const formattedTranslations = compose(
    formatTranslations,
    addFilePath(this.request)
  )(translations);

  const output = {
    path: `${this.context}/${getFilename(this.resourcePath)}.en.po`,
    source: `${formattedTranslations}`
  }

  fs.writeFileSync(output.path, output.source);

  return source;
}
