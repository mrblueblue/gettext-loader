import esprima from 'esprima-fb';
import {prop} from 'ramda';

export default function parseECMA(source){
  return prop('body')(
    esprima.parse(source, {
      tolerant: true,
      loc: true,
      range: true
    }));
}
