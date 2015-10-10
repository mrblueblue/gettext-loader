import {reduce, last, takeLast} from 'ramda';
import makeRelativePath from './makeRelativePath'

export default function formatTranslations(translations){
  return reduce(format, '')(translations);;
}

export function format(accum, object){



  const translationBlock = [
    `#: ${makeRelativePath(object.path)} ${object.loc.line}:${object.loc.column}`,
    `msgid "${object.text}"`,
    'msgtr ""',
    '\n',
  ]
  return accum + translationBlock.join('\n')
}
