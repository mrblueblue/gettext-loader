import {compose, dropLast, join, split, last} from 'ramda';

export default compose(
  join('.'),
  dropLast(1),
  split('.'),
  last,
  split('/')
)
