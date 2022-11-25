import _ from "lodash";

export default function toPlainFormat(diffMap, parents = '') {
    return diffMap.reduce((res, node) => {
        if (_.has(node, 'nodeChild')) {
            const parentsForIter = parents + node.nodeKey + '.';
            res.push(toPlainFormat(node.nodeChild, parentsForIter));
        } else {
            switch (node.diffStatus) {
                case 'updated':
                    const Old = simplOrCompVal(ifStrToApostrofs(node.nodeValueOld));
                    const New = simplOrCompVal(ifStrToApostrofs(node.nodeValueNew));
                    res.push(`Property '${parents}${node.nodeKey}' was updated. From ${Old} to ${New}`);
                    break;
                case 'deleted':
                    res.push(`Property '${parents}${node.nodeKey}' was removed`);
                    break;
                case 'added':
                    const nodeValue = simplOrCompVal(ifStrToApostrofs(node.nodeValue));
                    res.push(`Property '${parents}${node.nodeKey}' was added with value: ${nodeValue}`);
            }
        }
        return res;
    }, []).join('\n');
}

function simplOrCompVal(val) {
    return _.isObject(val) ? '[complex value]' : val;
}

function ifStrToApostrofs(val)
{
    return typeof val === 'string' ? `'${val}'` : val;
}
