import {compose, join, dropLast, split, last} from 'ramda';

export default compose(
  join('.'),
  dropLast(1),
  split('.'),
  last,
  split('/')
)
