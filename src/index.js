const DEFAULT_GETTEXT = '__'

import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import loaderUtils from 'loader-utils';
import po2json from 'po2json';
import {compose, prop, filter} from 'ramda';

import {
  extractTranslations,
  formatHeader,
  parseECMA,
  addFilePath,
  formatWithRequest,
  getFilename,
  getFolderPath
} from './utils';

const root = process.env.PWD;
const config = require(path.join(root, 'gettext.config.js'));

module.exports = function(source) {

  if (this.cacheable){
    this.cacheable();
  }

  const output = {
    path: `${root}/${config.output || 'en.po'}`
  }

  const methodNames = config.methods || [DEFAULT_GETTEXT];

  const AST = parseECMA(source);
  const translations = extractTranslations(...methodNames)(AST);

  if (!translations.length){
    return source;
  }

  const formatTranslations = formatWithRequest(this.request);

  try {
    const buffer = fs.readFileSync(output.path);
    const current = po2json.parse(buffer);
    const newStrings = (node) => !current[prop('text')(node)]
    const found = filter(newStrings)(translations);

    if (found.length){

      console.log(
        `${found.length} new translations found in ${getFilename(this.resourcePath)}`
      );

      output.source = formatTranslations(found);
      fs.appendFileSync(output.path, output.source);
    }

  } catch (error) {
    const header = formatHeader(config.header);
    const body = formatTranslations(translations);
    output.source = `${header}\n${body}`

    mkdirp.sync(getFolderPath(output.path));
    fs.writeFileSync(output.path, output.source);
  }

  return source;
}
