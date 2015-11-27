import {compose, dropLast, join, split, last} from 'ramda';

export default compose(
  join('.'),
  split('.'),
  last,
  split('/')
)
