import {reduce} from 'ramda';

export default function formatTranslations(translations){
  return reduce(format, '')(translations);;
}

export function format(accum, object){
  const translationBlock = [
    `#: ${object.path} ${object.loc.line}:${object.loc.column}`,
    `msgid "${object.text}"`,
    'msgtr ""',
    '\n',
  ]
  return accum + translationBlock.join('\n')
}
