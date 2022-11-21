import { test, expect } from '@jest/globals';
import getObjFromFile from '../src/Parsers.js'

const pathToJsonFile = '__tests__/__fixtures__/file1.json';
const pathToYamlFile = '__tests__/__fixtures__/file1.yaml';
const res = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};


test('getObjFromFile() JSON', () => {
  expect(getObjFromFile(pathToJsonFile)).toMatchObject(res);
});

test('genDiffFromObjs() YAML', () => {
  expect(getObjFromFile(pathToYamlFile)).toMatchObject(res);
});
