const DEFAULT_GETTEXT = '__'

import fs from 'fs';
import path from 'path';
import loaderUtils from 'loader-utils';
import po2json from 'po2json';
import {compose, prop, filter} from 'ramda';
import {
  extractTranslations,
  parseECMA,
  addFilePath,
  formatWithRequest,
  getFilename
} from './utils';

module.exports = function(source) {

  if (this.cacheable){
    this.cacheable();
  }

  const output = {
    path: `${this.context}/${getFilename(this.resourcePath)}.en.po`
  }

  const query = loaderUtils.parseQuery(this.query);
  const queries = Object.keys(query);
  const methodNames = queries.length ? queries : [DEFAULT_GETTEXT]

  const AST = parseECMA(source);
  const translations = extractTranslations(...methodNames)(AST);

  if (!translations.length){
    return source;
  }

  fs.readFile(output.path, (err, buffer) => {

    const formatTranslations = formatWithRequest(this.request);

    if (err) {
      output.source = formatTranslations(translations);
      fs.writeFileSync(output.path, output.source);

    } else {
      const current = po2json.parse(buffer);
      const newStrings = (node) => !current[prop('text')(node)]
      const found = filter(newStrings)(translations);

      if (found.length){
        console.log(`${found.length} new translations found`);
        output.source = formatTranslations(found);
        fs.appendFileSync(output.path, output.source);
      }
    }
  });

  return source;
}
