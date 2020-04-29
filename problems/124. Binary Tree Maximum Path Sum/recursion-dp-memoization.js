// time complexity: O(n)
// space complexity: O(1) (not counting memory required for recursion)

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
 * @return {number}
 */
let maxPathSum = function(root) {
    function getMaxPathSum(root) {
        if (!root) {
            return 0;
        }
        let left = getMaxPathSum(root.left);
        let right = getMaxPathSum(root.right);
        let rootMax = Math.max(root.val, root.val + left, root.val + right);
        max = Math.max(max, rootMax, root.val + left + right);
        return rootMax;
    }

    let max = -Infinity;
    getMaxPathSum(root);
    return max;
};

let tests = [
    {
        params: [convertArrayToBinaryTree([1,2,3])],
        ans: 6,
    },
    {
        params: [convertArrayToBinaryTree([-10,9,null,null,20,15,null,null,7])],
        ans: 42,
    },
];

tests.forEach(test => {
    let res = maxPathSum(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
