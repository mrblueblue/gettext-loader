import {any} from 'ramda';
import {isMethod} from 'ast-esprima-utils';

export default function isAnyGettextMethod(functions, node){
  return any((func) => isMethod(func,node))(functions);
}
