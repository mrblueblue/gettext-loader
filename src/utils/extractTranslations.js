import {filter, map, concat} from 'ramda';

import {
  getCallExpressions,
  isGettextMethod,
  isGettextFunction,
  getFirstArgument
} from 'ast-esprima-utils';

export default function extractTranslations(ast){

  const callExpressions = getCallExpressions(ast);
  const gettextFunctions = filter(isGettextFunction, callExpressions);
  const gettextMethods = filter(isGettextMethod, callExpressions)
  const gettexts = concat(gettextFunctions, gettextMethods)

  const locations = map((node) => node.loc.start)(gettexts)
  const translations = getFirstArgument(gettexts);

  return map((translation) => {
    const location = locations[translations.indexOf(translation)];
    return {
      text: translation,
      loc: {
        line: location.line,
        column: location.column
      }
    }
  })(translations);
}
