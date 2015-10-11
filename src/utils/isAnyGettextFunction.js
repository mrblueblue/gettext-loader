import {any} from 'ramda';
import {isFunction} from 'ast-esprima-utils';

export default function isAnyGettextFunction(functions, node){
  return any((func) => isFunction(func, node))(functions)
}
