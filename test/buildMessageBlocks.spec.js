import {expect} from 'chai';
import {range} from 'ramda'
import {
  buildMsgstr,
  buildMsgstrs,
  getNumPlurals,
  formatMessageBlock,
} from '../src/utils/buildMessageBlocks';

import buildMessageBlocks from '../src/utils/buildMessageBlocks';

describe('buildMessageBlocks', () => {

  it('builds a message block for a po file', () => {

    let translations = [
      {
        text: 'hey',
        path: '/here',
        loc: {
          line: 1,
          column: 5
        }
      },
      {
        text: 'thank you',
        path: '/here',
        loc: {
          line: 1,
          column: 5
        }
      },
      {
        text: 'how are you',
        path: '/here',
        loc: {
          line: 1,
          column: 5
        }
      }
    ]

    const expected = [
      '#: /here 1:5\n',
      'msgid "hey"\n',
      'msgstr ""\n',
      "\n",
      '#: /here 1:5\n',
      'msgid "thank you"\n',
      'msgstr ""\n',
      "\n",
      '#: /here 1:5\n',
      'msgid "how are you"\n',
      'msgstr ""\n\n'
    ]

    const formatted = buildMessageBlocks(translations);
    expect(formatted).to.be.deep.equal(expected.join(''));
  });

  it('takes into account plural forms', () => {
    let translations = [
      {
        text: 'hey',
        path: '/here',
        loc: {
          line: 1,
          column: 5
        }
      },
      {
        text: '%d views',
        path: '/here',
        loc: {
          line: 1,
          column: 5
        }
      }
    ]

    const expected = [
      '#: /here 1:5\n',
      'msgid "hey"\n',
      'msgstr ""\n',
      "\n",
      '#: /here 1:5\n',
      'msgid "%d views"\n',
      'msgid_plural ""\n',
      'msgstr[0] ""\n',
      'msgstr[1] ""\n\n'
    ]

    const formatted = buildMessageBlocks(translations);

    expect(formatted).to.be.deep.equal(expected.join(''));
  });

  describe('buildMsgstr', () => {

    it('builds a msgstr in a po file', () => {
      let ouput = ['msgstr[0] ""\n', 'msgstr[1] ""\n'];
      expect(buildMsgstr([0,1])).to.be.deep.equal(ouput);
    });
  });

  describe('buildMsgstrs', () => {
    it('builds an array of msgstr\'s given a range', () => {
      let ouput = ['msgstr[0] ""\n', 'msgstr[1] ""\n', 'msgstr[2] ""\n', 'msgstr[3] ""\n'];
      expect(buildMsgstrs(4)).to.be.deep.equal(ouput.join(''));
    });
  });

  describe('getNumPlurals', () => {
    it('determines the number of plural forms given a config', () => {
      let config = 'nplurals=2; plural=(n != 1);'
      expect(getNumPlurals(config)).to.be.equal(2);
    });
  });

  describe('formatMessageBlock', () => {
    it('takes an object, formats it, adds to and returns accumulator', () => {

      let translation = {
        text: 'hello',
        path: '/here',
        loc: {
          line: 1,
          column: 5
        }
      }

      const expected = [
        '#: /here 1:5',
        'msgid "hello"',
        'msgstr ""',
        '\n'
      ]

      const formatted = formatMessageBlock('', translation);

      expect(formatted).to.be.equal(expected.join('\n'));
    });

    it('formats plural text properly', () => {

      let translation = {
        text: '%d views',
        path: '/here',
        loc: {
          line: 1,
          column: 5
        }
      }

      const expected = [
        '#: /here 1:5',
        'msgid "%d views"',
        'msgid_plural ""',
        'msgstr[0] ""',
        'msgstr[1] ""\n\n'
      ]

      const formatted = formatMessageBlock('', translation);

      expect(formatted).to.be.equal(expected.join('\n'));
    });
  });

});
