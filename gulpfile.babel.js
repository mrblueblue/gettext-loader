
'use strict';

var R = require('ramda');
var fs = require('fs');
var gulp = require('gulp');

gulp.task('utils', () => {

  fs.readdir('src/utils', (err, data) => {
    function removeIndexFile(files){
      let indexIndex = files.indexOf('index.js');
      return R.remove(indexIndex, 1, files);
    }

    function removeExtension(str){
      let periodIndex = str.split('').indexOf('.');
      return str.substring(0, periodIndex);
    }

    function buildExportStatement(file){
      return `export const ${file} = require('./${file}');\n`;
    }

    const files = R.compose(
      R.map(buildExportStatement),
      R.map(removeExtension),
      removeIndexFile
    )(data);
    
    console.log('creating /utils/index.js ...');
    console.log(files.join(''));

    fs.writeFileSync('src/utils/index.js', files.join(''));
  });
});
