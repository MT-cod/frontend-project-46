import _ from 'lodash';
import { test, expect } from '@jest/globals';
import genDiff, { genDiffFromObjs } from '../src/GenDiff.js';

const pathToFile1 = '__tests__/__fixtures__/file1.json';
const pathToFile2 = '__tests__/__fixtures__/file2.json';
const format = 'stylish';
const file1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
};
const file2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
};
const resGenDiff = {
  "- follow": false,
  "  host": "hexlet.io",
  "- proxy": "123.234.53.22",
  "- timeout": 50,
  "+ timeout": 20,
  "+ verbose": true
};
const resGenDiffFromObjs = [
  {
    "nodeKey": "follow",
    "nodeValue": false,
    "diffStatus": "deleted"
  },
  {
    "nodeKey": "host",
    "nodeValue": "hexlet.io",
    "diffStatus": "unchanged"
  },
  {
    "nodeKey": "proxy",
    "nodeValue": "123.234.53.22",
    "diffStatus": "deleted"
  },
  {
    "nodeKey": "timeout",
    "nodeValueOld": 50,
    "nodeValueNew": 20,
    "diffStatus": "updated"
  },
  {
    "nodeKey": "verbose",
    "nodeValue": true,
    "diffStatus": "added"
  }
];

test('genDiff()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(genDiff(pathToFile1, pathToFile2, format)).toMatchObject(resGenDiff);
});

test('genDiffFromObjs()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(genDiffFromObjs(file1, file2)).toMatchObject(resGenDiffFromObjs);
});
