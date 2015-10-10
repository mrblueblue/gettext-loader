import fs from 'fs';
import path from 'path';
import chai from 'chai';
import gettext from '../src/gettext-loader'

chai.should();

describe('first test', () => {
  it('should pass', () => {

    gettext("\nvar __ = function(string){\n  return string;\n}\n\nvar sub = function(string){\n  return string.substring(0,1);\n}\n\nvar b = __('about')\n\n__(`${b} hello`)\n\n__('can you see this');\n\n")
    let condition = true;
    condition.should.equal(true);
  });
});
