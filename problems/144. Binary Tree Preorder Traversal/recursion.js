const {TreeNode, convertArrayToBinaryTree, compareArrays} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
let preorderTraversal = function(root) {
    function calc(root) {
        if (!root) return;
        res.push(root.val);
        if (root.left) calc(root.left);
        if (root.right) calc(root.right);
    }

    let res = [];
    if (root) calc(root);
    return res;
};

let tests = [
    { params: [convertArrayToBinaryTree([1,null,2,3])], ans: [1,2,3] },
    { params: [convertArrayToBinaryTree([3,2,null,null,5,4])], ans:  [3,2,5,4] },
];

tests.forEach(test => {
    let res = preorderTraversal(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
