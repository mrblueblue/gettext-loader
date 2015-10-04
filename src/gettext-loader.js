import fs from 'fs';
import path from 'path';

import loaderUtils from 'loader-utils';

import esprima from 'esprima-fb';
import {getCallExpressions} from 'ast-utils-esprima';

module.exports = function(source) {

  this.cacheable();

  const ast = esprima.parse(source, { tolerant: true, loc: true, range: true }).body;

  const CallExpressions = getCallExpressions(ast);

  console.log(CallExpressions);

  return source;
}
