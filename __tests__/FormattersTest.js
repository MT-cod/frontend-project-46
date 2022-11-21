import { test, expect } from '@jest/globals';
import toStylishFormat from '../src/Formatters/FormatStylish.js'
import {resGenDiffFromObjs as diffMap} from "./GenDiffTest.js";


const resToStylishFormat = {
  "- follow": false,
  "  host": "hexlet.io",
  "- proxy": "123.234.53.22",
  "- timeout": 50,
  "+ timeout": 20,
  "+ verbose": true
};

test('toStylishFormat()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(toStylishFormat(diffMap)).toMatchObject(resToStylishFormat);
});

/*test('genDiffFromObjs()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(genDiffFromObjs(file1, file2)).toMatchObject(resGenDiffFromObjs);
});*/
