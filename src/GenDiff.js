import _ from 'lodash';
import getObjFromFile from './Parsers.js';
import toFormat from './Formatters/index.js';

export function genDiffFromObjs(obj1, obj2) {
  const merged = _.merge(_.cloneDeep(obj1), _.cloneDeep(obj2));
  const sortedKeys = _.orderBy(Object.keys(merged));

  return sortedKeys.map((nodeKey) => {
    if (!_.has(obj1, nodeKey) && _.has(obj2, nodeKey)) {
      return { nodeKey, nodeValue: obj2[nodeKey], diffStatus: 'added' };
    }
    if (_.has(obj1, nodeKey) && !_.has(obj2, nodeKey)) {
      return { nodeKey, nodeValue: obj1[nodeKey], diffStatus: 'deleted' };
    }
    if (_.has(obj1, nodeKey) && _.has(obj2, nodeKey) && _.isEqual(obj1[nodeKey], obj2[nodeKey])) {
      return { nodeKey, nodeValue: obj1[nodeKey], diffStatus: 'unchanged' };
    }
    if (_.has(obj1, nodeKey) && _.has(obj2, nodeKey) && !_.isEqual(obj1[nodeKey], obj2[nodeKey])) {
      if (typeof obj1[nodeKey] === 'object' && typeof obj2[nodeKey] === 'object') {
        return { nodeKey, nodeChild: genDiffFromObjs(obj1[nodeKey], obj2[nodeKey]), diffStatus: 'updated' };
      }
      return {
        nodeKey,
        nodeValueOld: obj1[nodeKey],
        nodeValueNew: obj2[nodeKey],
        diffStatus: 'updated',
      };
    }
    return merged.nodeKey;
  });
}

export default function genDiff(pathToFile1, pathToFile2, outFormat = 'stylish') {
  const obj1 = getObjFromFile(pathToFile1);
  const obj2 = getObjFromFile(pathToFile2);
  const diffMap = genDiffFromObjs(obj1, obj2);

  return toFormat(Object.values(diffMap), outFormat);
}
