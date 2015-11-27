import {compose} from 'ramda';
import addFilePath from './addFilePath';
import formatMessageBlock from './formatMessageBlock';

const formatWithRequest = (request) => compose(
  formatMessageBlock,
  addFilePath(request)
)

export default formatWithRequest;
