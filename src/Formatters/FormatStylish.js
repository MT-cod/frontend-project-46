import _ from 'lodash';

function addSpacesIfValIsArr(val, spaces) {
  const spacesForIter = `${spaces}    `;
  const obj = Object.keys(val).reduce((res, key) => {
    if (typeof val[key] === 'object' && val[key] !== null) {
      return `${res}${spacesForIter}    ${key}: ${addSpacesIfValIsArr(val[key], spacesForIter)}`;
    }
    return `${res}${spacesForIter}    ${key}: ${val[key]}\n`;
  }, '');
  return `{\n${obj}${spacesForIter}}\n`;
}

function checkType(val, spaces) {
  if (typeof val === 'object' && val !== null) {
    return addSpacesIfValIsArr(val, spaces).slice(0, -1);
  }
  return val;
}

function processing(diffMap, spaces = '') {
  return diffMap.reduce((res, node) => {
    if (_.has(node, 'nodeChild')) {
      const spacesForIter = `${spaces}    `;
      return `${res}${spaces}    ${node.nodeKey}: `
        + `{\n${processing(node.nodeChild, spacesForIter)}${spaces}    }\n`;
    }
    switch (node.diffStatus) {
      case 'updated':
        return `${res}${spaces}  - ${node.nodeKey}: ${checkType(node.nodeValueOld, spaces)}\n`
        + `${spaces}  + ${node.nodeKey}: ${checkType(node.nodeValueNew, spaces)}\n`;
      case 'deleted':
        return `${res}${spaces}  - ${node.nodeKey}: ${checkType(node.nodeValue, spaces)}\n`;
      case 'added':
        return `${res}${spaces}  + ${node.nodeKey}: ${checkType(node.nodeValue, spaces)}\n`;
      default:
        return `${res}${spaces}    ${node.nodeKey}: ${checkType(node.nodeValue, spaces)}\n`;
    }
  }, '');
}

export default function toStylishFormat(diffMap) {
  return `{\n${processing(diffMap).slice(0, -1)}\n}`;
}
