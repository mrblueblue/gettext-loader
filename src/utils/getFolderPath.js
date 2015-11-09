import {compose, dropLast, split, join} from 'ramda';

export default function getFolderPath(filePath){
  return compose(join('/'), dropLast(1), split('/'))(filePath);
}