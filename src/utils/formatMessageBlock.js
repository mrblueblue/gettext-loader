import {reduce, last, takeLast} from 'ramda';
import makeRelativePath from './makeRelativePath'

export default function formatMessageBlock(translations){
  function format(accum, object){
    const path = makeRelativePath(object.path);
    const translationBlock = [
      `#: ${path} ${object.loc.line}:${object.loc.column}`,
      `msgid "${object.text}"`,
      'msgtr ""',
      '\n',
    ]
    return accum + translationBlock.join('\n')
  }
  return reduce(format, '')(translations);
}
