import {split, last, takeLast, join, compose} from 'ramda'

export default function makeRelativePath(paths){
  const baseDir = getBase(process.env.PWD);
  const splitPath = splitLastPath(paths);
  const takeIdx = splitPath.length - splitPath.indexOf(baseDir) - 1;

  return compose(join('/'), takeLast(takeIdx))(splitPath);
}

export function getBase(pwd){
  return compose(last, split('/'))(pwd)
}

export function splitLastPath(paths){
  return compose(split('/'), last, split('!'))(paths)
}
