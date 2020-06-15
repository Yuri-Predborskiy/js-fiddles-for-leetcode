/*
Search in a binary search tree

Recursive algorithm, pretty straightforward once you learn to use recursion and binary search trees without duplicates
If node.val is smaller than val, search right
If node.val is larger than val, search left
If node is null, return null
If node is desired value, return node

Time complexity: O(log(n))
Space complexity: O(1), not considering recursion stack
 */

const {
    TreeNode,
    convertArrayToBinaryTreeLevelOrderTraversal,
    convertBinaryTreeToString
} = require('../helper');

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
 * @param {number} val
 * @return {TreeNode}
 */
let searchBST = function(root, val) {
    if (!root) {
        return root;
    }
    if (root.val === val) {
        return root;
    } else if (val > root.val) {
        return searchBST(root.right, val);
    } else {
        return searchBST(root.left, val);
    }
};

let tests = [
    {
        params: [convertArrayToBinaryTreeLevelOrderTraversal([4,2,7,1,3]), 2],
        ans: convertBinaryTreeToString(convertArrayToBinaryTreeLevelOrderTraversal([2,1,3]))
    },
    {
        params: [convertArrayToBinaryTreeLevelOrderTraversal([4,2,7,1,3]), 5],
        ans: convertBinaryTreeToString(null)
    },
];

tests.forEach(test => {
    let res = convertBinaryTreeToString(searchBST(...test.params));
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
