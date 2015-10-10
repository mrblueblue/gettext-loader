import fs from 'fs';
import path from 'path';

import esprima from 'esprima-fb'
import loaderUtils from 'loader-utils';

import {filter, uniq} from 'ramda';
import {getCallExpressions, isGettextFunction, getFirstArgument} from 'ast-utils-esprima';

module.exports = function(source) {

  const options = {
    tolerant: true,
    loc: true,
    range: true
  }

  const ast = esprima.parse(source, options).body;

  const callExpressions = getCallExpressions(ast);
  const gettextFunctions = filter(isGettextFunction, callExpressions);
  const translations = uniq(getFirstArgument(gettextFunctions));

  console.log(gettextFunctions[1].arguments[0].quasis);

  return source;
}
