import fs from 'fs';
import path from 'path';
import chai from 'chai';

import {
  addFilePath,
  extractTranslations,
  filterGettext,
  formatHeader,
  formatTranslations,
  isAnyGettextMethod,
  isAnyGettextFunction,
  makeRelativePath,
  parseECMA
} from '../src/utils';

chai.should();

describe('addFilePath', () => {
  it('should add file path to each translation in the collection', () => {
    const path = '/src'
    const translations = [{text: 'hello'}, {text: 'cool'}];
    const expected = [{text: 'hello', path: path}, {text: 'cool', path: path}];
    (addFilePath(path, translations)).should.deep.equal(expected);
  });
});

describe('extractTranslations', () => {
  it('should pass', () => {
    (true).should.equal(true);
  });
});

describe('filterGettext', () => {
  it('should pass', () => {
    (true).should.equal(true);
  });
});

describe('formatHeader', () => {
  it('should pass', () => {
    (true).should.equal(true);
  });
});

describe('formatTranslations', () => {
  it('should pass', () => {
    (true).should.equal(true);
  });
});

describe('isAnyGettextMethod', () => {
  it('should pass', () => {
    (true).should.equal(true);
  });
});

describe('isAnyGettextFunction', () => {
  it('should pass', () => {
    (true).should.equal(true);
  });
});

describe('makeRelativePath', () => {
  it('should pass', () => {
    (true).should.equal(true);
  });
});

describe('parseECMA', () => {
  it('should pass', () => {
    (true).should.equal(true);
  });
});
