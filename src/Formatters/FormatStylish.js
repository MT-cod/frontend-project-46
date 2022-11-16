import _ from "lodash";

export default function toStylishFormat(diffMap) {
  return diffMap.reduce((nodeData, node) => {
    switch (node.diffStatus) {
      case 'updated':
        if (_.has(node, 'nodeChild')) {
          nodeData[node.nodeKey] = toStylishFormat(node.nodeChild);
          break;
        }
        nodeData['- ' + node.nodeKey] = node.nodeValueOld;
        nodeData['+ ' + node.nodeKey] = node.nodeValueNew;
        break;
      case 'deleted':
        nodeData['- ' + node.nodeKey] = node.nodeValue;
        break;
      case 'added':
        nodeData['+ ' + node.nodeKey] = node.nodeValue;
        break;
      case 'unchanged':
        nodeData['  ' + node.nodeKey] = node.nodeValue;
    }
    return nodeData;
  }, {});
}