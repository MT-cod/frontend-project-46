import { test, expect } from '@jest/globals';
import getObjFromFile from '../src/Parsers.js'

const pathToJsonFile = '__tests__/__fixtures__/file1.json';
const pathToYamlFile = '__tests__/__fixtures__/file2.yaml';
const resJson = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};


test('getObjFromFile() JSON', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(getObjFromFile(pathToJsonFile)).toMatchObject(resJson);
});

/*test('genDiffFromObjs()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(genDiffFromObjs(file1, file2)).toMatchObject(resGenDiffFromObjs);
});*/
