import fs from 'fs';
import path from 'path';
import chai from 'chai';
import gettext from '../src/gettext-loader'

chai.should();

function WebpackMock(){
  this.cacheable = function(){return}
  this.bob = function(){return}
  this.request = '/Users/j.huang/code/ast-utils-esprima/node_modules/babel-loader/index.js!/Users/j.huang/code/ast-utils-esprima/node_modules/gettext-loader/dist/gettext-loader.js!/Users/j.huang/code/gettext-loader/sources/jsx-example.js'
}

describe('first test', () => {
  it('should pass', () => {

    gettext.bind(new WebpackMock(), "\nvar __ = function(string){\n  return string;\n}\n\nvar sub = function(string){\n  return string.substring(0,1);\n}\n\nvar b = __('about')\n\nsub('hello')\n\n__('can you see this');\n\n")()
    let condition = true;
    condition.should.equal(true);
  });
});