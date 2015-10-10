import {map, curry, merge} from 'ramda';

function addFilePath(path, translations){
  const addPath = (translation) => merge(translation)({path: path})
  return map(addPath, translations)
} 

export default curry(addFilePath);