import _ from 'lodash';

function simplOrCompVal(val) {
  return _.isObject(val) ? '[complex value]' : val;
}

function ifStrToApostrofs(val) {
  return typeof val === 'string' ? `'${val}'` : val;
}

export default function toPlainFormat(diffMap, parents = '') {
  return diffMap.reduce((res, node) => {
    if (_.has(node, 'nodeChild')) {
      const parentsForIter = `${parents}${node.nodeKey}.`;
      return `${res}${toPlainFormat(node.nodeChild, parentsForIter)}\n`;
    }
    switch (node.diffStatus) {
      case 'updated':
        return `${res}Property '${parents}${node.nodeKey}' was updated. `
          + `From ${simplOrCompVal(ifStrToApostrofs(node.nodeValueOld))} `
          + `to ${simplOrCompVal(ifStrToApostrofs(node.nodeValueNew))}\n`;
      case 'deleted':
        return `${res}Property '${parents}${node.nodeKey}' was removed\n`;
      case 'added':
        return `${res}Property '${parents}${node.nodeKey}' was added with value:`
          + ` ${simplOrCompVal(ifStrToApostrofs(node.nodeValue))}\n`;
      default:
        return res;
    }
  }, '').replaceAll('\n\n', '\n').slice(0, -1);
}
