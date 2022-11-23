import _ from "lodash";

export default function toPlainFormat(diffMap, parents = '') {
    return diffMap.reduce((res, node) => {
        if (_.has(node, 'nodeChild')) {
            const parentsForIter = parents + node['nodeKey'] + '.';
            res = res + '\n' + toPlainFormat(node['child'], parentsForIter);
        } else {
            switch (node.diffStatus) {
                case 'updated':
                    const Old = simplOrCompVal(node['nodeValueOld']);
                    const New = simplOrCompVal(node['nodeValueNew']);
                    res = res + '\n' + `Property '${parents}${node['nodeKey']}' was updated. From ${Old} to ${New}`;
                    break;
                case 'deleted':
                    res = res + '\n' + `Property '${parents}${node['nodeKey']}' was removed`;
                    break;
                case 'added':
                    const nodeValue = simplOrCompVal(node['nodeValue']);
                    res = res + '\n' + `Property '${parents}${node['nodeKey']}' was added with value: ${nodeValue}`;
            }
        }
        return res;
    }, {});
    //return implode("\n", $filteredPlainResultArr);
}

function simplOrCompVal(val) {
    return _.isObject(val) ? '[complex value]' : val;
}

/*function ifBoolOr0ToString(value)
{
    if ($value === true) {
        return 'true';
    } elseif ($value === false) {
        return 'false';
    } elseif ($value === null) {
        return 'null';
    } elseif ($value === 0) {
        return 0;
    }
    return "'$value'";
}*/
