/*
Invert a binary tree
Simply swap left and right children, then repeat this recursively for each child node
Return root when done.

Time complexity: O(n)
Space complexity: O(1)
 */

// todo: improve tests by adding a function to convert binary tree to array using level-order traversal
//  this will make LeetCode tests easier to convert to my tests

const {
    convertArrayToBinaryTreeLevelOrderTraversal,
    compareArraysStrict,
    convertBinaryTreeToArray
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
 * @return {TreeNode}
 */
let invertTree = function(root) {
    if (!root) {
        return root;
    }
    temp = root.left;
    root.left = root.right;
    root.right = temp;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};

let tests = [
    {
        params: [convertArrayToBinaryTreeLevelOrderTraversal([4,2,7,1,3,6,9])],
        ans: [4,7,9,6,2,3,1]
    },
];

tests.forEach(test => {
    let res = convertBinaryTreeToArray(invertTree(...test.params));
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
