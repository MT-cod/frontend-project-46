import _ from 'lodash';

function addSpacesIfValIsArr(val) {
  if (typeof val === 'object' && val !== null) {
    return Object.keys(val).reduce((res, key) => {
      if (typeof val[key] === 'object' && val[key] !== null) {
        res[`  ${key}`] = addSpacesIfValIsArr(val[key]);
      } else {
        res[`  ${key}`] = val[key];
      }
      return res;
    }, {});
  }
  return val;
}

function processing(diffMap) {
  return diffMap.reduce((nodeData, node) => {
    switch (node.diffStatus) {
      case 'updated':
        if (_.has(node, 'nodeChild')) {
          nodeData[`  ${node.nodeKey}`] = processing(node.nodeChild);
          break;
        }
        nodeData[`- ${node.nodeKey}`] = addSpacesIfValIsArr(node.nodeValueOld);
        nodeData[`+ ${node.nodeKey}`] = addSpacesIfValIsArr(node.nodeValueNew);
        break;
      case 'deleted':
        nodeData[`- ${node.nodeKey}`] = addSpacesIfValIsArr(node.nodeValue);
        break;
      case 'added':
        nodeData[`+ ${node.nodeKey}`] = addSpacesIfValIsArr(node.nodeValue);
        break;
      default:
        nodeData[`  ${node.nodeKey}`] = addSpacesIfValIsArr(node.nodeValue);
    }
    return nodeData;
  }, {});
}

export default function toStylishFormat(diffMap) {
  return JSON
    .stringify(processing(diffMap), null, 4)
    .replaceAll('  \"', '')
    .replaceAll('\"', '')
    .replaceAll('\,', '');
}
