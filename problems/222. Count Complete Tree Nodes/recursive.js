/*
Count the number of nodes in a tree

Recursively check every node and return 1 for existing nodes, 0 for null
Return sum from all nodes

Time complexity: O(n)
Space complexity: O(1) outside of recursion
 */

const {
    convertArrayToBinaryTreeLevelOrderTraversal,
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
 * @return {number}
 */
let countNodes = function(root) {
    function count(root, num) {
        if (!root) {
            return 0;
        }
        return count(root.left, num) + count(root.right, num) + 1;
    }
    return count(root, 0);
};

let tests = [
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([1,2,3,4,5,6])], ans: 6},
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([1,2,3,4])], ans: 4},
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([1])], ans: 1},
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([])], ans: 0},
];

tests.forEach(test => {
    let res = countNodes(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
