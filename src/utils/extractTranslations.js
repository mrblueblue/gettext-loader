import {filter, map} from 'ramda';
import {getCallExpressions, isGettextFunction, getFirstArgument} from 'ast-utils-esprima';

export default function extractTranslations(ast){

  const callExpressions = getCallExpressions(ast);
  const gettextFunctions = filter(isGettextFunction, callExpressions);

  const locations = map((node) => node.loc.start)(gettextFunctions)
  const translations = getFirstArgument(gettextFunctions);

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
