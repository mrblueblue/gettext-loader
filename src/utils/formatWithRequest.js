import {compose} from 'ramda';
import addFilePath from './addFilePath';
import buildMessageBlocks from './buildMessageBlocks';

const formatWithRequest = (request) => compose(
  buildMessageBlocks,
  addFilePath(request)
)

export default formatWithRequest;
