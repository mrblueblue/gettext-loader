import {expect} from 'chai';
import gettextLoader from '../src'

describe('gettext-loader', () => {
  it('exports a function', () => {
    expect(typeof gettextLoader === 'function').to.be.true;
  });
});
