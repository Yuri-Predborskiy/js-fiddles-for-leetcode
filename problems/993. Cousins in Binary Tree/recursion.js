const {convertArrayToBinaryTree} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
let isCousins = function(root, x, y) {
    function findVal(node, parent, level) {
        if (!node) {
            return;
        }
        if (node.val === x) {
            xLevel = level;
            xParent = parent;
        } else if (node.val === y) {
            yLevel = level;
            yParent = parent;
        }
        if (!xParent || !yParent) {
            findVal(node.left, node, level + 1);
            findVal(node.right, node, level + 1);
        }
    }
    let xLevel = -1, yLevel = -1, xParent = null, yParent = null;
    findVal(root, null, 0);

    return xLevel === yLevel && xParent !== yParent;
};

let tests = [
    {
        params: [convertArrayToBinaryTree([1,2,4,null,null,null,3]), 4, 3],
        ans: false,
    },
    {
        params: [convertArrayToBinaryTree([1,2,4,null,null,null,3, null, 5]), 5, 4],
        ans: true,
    },
    {
        params: [convertArrayToBinaryTree([1,2,4,null,null,null,3]), 2, 3],
        ans: false,
    },
];

tests.forEach(test => {
    let res = isCousins(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
