import {compose, any, equals, split} from 'ramda';

export default compose(
  any(equals('%')),
  split('')
)
