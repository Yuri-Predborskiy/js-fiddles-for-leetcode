const {convertArrayToBinaryTree} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
let diameterOfBinaryTree = function(root) {
    function getMaxDepth(node) {
        if (!node) {
            return -1;
        }
        let left = getMaxDepth(node.left) + 1;
        let right = getMaxDepth(node.right) + 1;
        maxDepth = Math.max(maxDepth, left + right);
        return Math.max(left, right);
    }

    let maxDepth = 0;
    getMaxDepth(root);
    return maxDepth;
};
let tests = [
    {
        params: [convertArrayToBinaryTree([1,2,3,null,null,4,5])],
        ans: 3,
    },
    {
        params: [convertArrayToBinaryTree([1])],
        ans: 0,
    },
    {
        params: [convertArrayToBinaryTree([1,2,3])],
        ans: 2,
    },
    {
        params: [convertArrayToBinaryTree([1,2])],
        ans: 1,
    },
    {
        params: [convertArrayToBinaryTree([1,2,3,null,4,5,null,null,null,6,null,7,8,null,null,null,9])],
        ans: 6,
    },
];

tests.forEach(test => {
    let res = diameterOfBinaryTree(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
