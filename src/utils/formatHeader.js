import {reduce, keys, values, concat} from 'ramda';

export default function formatHeader(header){

  const headerKeys = keys(header)
  const headerValues = values(header)

  return reduce((accum, key) => {
    return accum + `"${key} : ${headerValues[headerKeys.indexOf(key)]}"\n`
  }, '')(headerKeys)

}