import {filter, map, curry} from 'ramda';
import {getCallExpressions, getFirstArgument} from 'ast-esprima-utils';
import filterGettext from './filterGettext';

function extractTranslations(methods, ast){
  const callExpressions = getCallExpressions(ast);
  const gettexts = filterGettext(methods, callExpressions);
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

export default curry(extractTranslations);
