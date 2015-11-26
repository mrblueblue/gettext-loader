import {filter, map, curry, compose, prop, head} from 'ramda';
import {filterTreeForMethodsAndFunctionsNamed} from 'estree-utils';

const extractTranslations = (...args) => (ast) => {

  const gettextFunctions = filterTreeForMethodsAndFunctionsNamed(...args)(ast);

  if (!gettextFunctions.length){
    return [];
  }

  const gettextLocations = map((node) => node.loc.start)(gettextFunctions);
  const firstArgument = compose(prop('value'), head, prop('arguments'));
  const translationStrings = map(firstArgument)(gettextFunctions);

  const addLocation = (string) => {
    const location = gettextLocations[translationStrings.indexOf(string)];
    return {
      text: string,
      loc: {
        line: location.line,
        column: location.column
      }
    }
  }

  return map(addLocation)(translationStrings);
}

export default extractTranslations;
