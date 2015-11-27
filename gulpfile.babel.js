'use strict';

import {compose, map, remove} from 'ramda';
import fs from 'fs';
import gulp from 'gulp';

gulp.task('utils', () => {

  fs.readdir('src/utils', (err, data) => {
    function removeIndexFile(files){
      let indexIndex = files.indexOf('index.js');
      return remove(indexIndex, 1, files);
    }

    function removeExtension(str){
      let periodIndex = str.split('').indexOf('.');
      return str.substring(0, periodIndex);
    }

    function buildExportStatement(file){
      return `export ${file} from './${file}';\n`;
    }

    const files = compose(
      map(buildExportStatement),
      map(removeExtension),
      removeIndexFile
    )(data);

    console.log('creating /utils/index.js ...');
    console.log(files.join(''));

    fs.writeFileSync('src/utils/index.js', files.join(''));
  });

});
