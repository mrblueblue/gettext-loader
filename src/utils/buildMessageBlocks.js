import path from 'path';
import makeRelativePath from './makeRelativePath';
import isPluralForm from './isPluralForm';

import {

  compose as cx,
  concat as cat,
  join,
  reduce,
  last,
  takeLast,
  map,
  head,
  split,
  range
  
} from 'ramda';

const root = process.env.PWD;
const config = require(path.join(root, 'gettext.config.js'));

export const buildMsgtr = map((num) => `msgtr[${num}] ""\n`)
export const buildMsgtrs = (num) => cx(join(''), buildMsgtr)(range(0, num))
export const getNumPlurals = cx(parseInt, last, head, split(';'))

export const formatMessageBlock = (accum, translation) => {
  const path = makeRelativePath(translation.path);

  const translationBlock = cat(
    `#: ${path} ${translation.loc.line}:${translation.loc.column}\n`,
    `msgid "${translation.text}"`
  )

  if (isPluralForm(translation.text)){
    const msgstrs = cx(
      buildMsgtrs,
      getNumPlurals
    )(config.header['Plural-Forms'])

    return cx(
      cat(accum),
      cat(translationBlock),
      cat('\n'),
      cat(msgstrs),
    )('\n');
  }

  return cx(
    cat(accum),
    cat(translationBlock),
    cat('\n'),
    cat('msgtr ""\n'),
  )('\n');
}

export default reduce(formatMessageBlock, '')
