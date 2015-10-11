import {filter, or} from 'ramda';
import isAnyGettextMethod from './isAnyGettextMethod';
import isAnyGettextFunction from './isAnyGettextFunction';

export default function filterGettext(functions, expressions){
  return filter((node) => or(
    isAnyGettextMethod(functions, node),
    isAnyGettextFunction(functions, node)
  ))(expressions)
}
