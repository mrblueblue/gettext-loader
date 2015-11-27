import {expect} from 'chai';
import {map, all, has} from 'ramda';
import fs from 'fs';
import parseECMA from '../src/utils/parseECMA';
import extractTranslations from '../src/utils/extractTranslations'

const source = fs.readFileSync('./assets/jsx/example.jsx', 'utf8');
const AST = parseECMA(source);

describe('extractTranslations', () => {

  const translations = extractTranslations('__')(AST);
  const emptyTranslations = extractTranslations('foo')(AST);
  const multipleTranslations = extractTranslations('__', 'translate')(AST)

  it('exports a function', () => {
    expect(typeof extractTranslations === 'function').to.be.true
  });

  it('returns a collection', () => {
    expect(Array.isArray(translations)).to.be.true;
  });

  it('returns an empty collection if no translations are found', () => {
    expect(emptyTranslations.length).to.be.equal(0);
  });

  it('returns a collection of all translation strings found in an AST', () => {
    const strings = ['pegasus', 'morning star'];
    expect(map((node) => node.text)(translations)).to.be.deep.equal(strings)
  });

  it('returns the location of each translation string', () => {
    const allHaveLoc = all(has('loc'))
    expect(allHaveLoc(translations)).to.be.true;
  });

  it('can receive multiple name arguments', () => {
    const strings = ['evening star', 'pegasus', 'morning star'];
    expect(map((node) => node.text)(multipleTranslations)).to.be.deep.equal(strings);
  });
});
