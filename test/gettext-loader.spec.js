import fs from 'fs';
import path from 'path';
import chai from 'chai';

chai.should();

describe('first test', () => {
  it('should pass', () => {
    let condition = true;
    condition.should.equal(true);
  });
});
