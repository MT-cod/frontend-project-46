import { test, expect } from '@jest/globals';
import toStylishFormat from '../src/Formatters/FormatStylish.js'

const resToStylishFormat = {
  "- follow": false,
  "  host": "hexlet.io",
  "- proxy": "123.234.53.22",
  "- timeout": 50,
  "+ timeout": 20,
  "+ verbose": true
};
const diffMap = [
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

test('toStylishFormat()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(toStylishFormat(diffMap)).toMatchObject(resToStylishFormat);
});

/*test('genDiffFromObjs()', () => {
  //expect(genDiff(athToFile1, pathToFile2, outFormat)).toMatchObject(res1);
  expect(genDiffFromObjs(file1, file2)).toMatchObject(resGenDiffFromObjs);
});*/
