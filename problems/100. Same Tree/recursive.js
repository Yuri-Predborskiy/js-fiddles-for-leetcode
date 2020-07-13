/*
Check if two trees have the same structure and values

Recursive solution
Check if both roots exists.
If neither root exists - return true.
If both exist and values are different - return false.
If only one of the roots exists - return false.
The recursively perform the same check for left tree and right tree

Due to execution order, this is a depth-first search algorithm

Time complexity: O(n)
Space complexity: O(1) outside of recursion stack.
    If the tree is balanced, recursion stack may need O(log(n)) space
    If the tree is unbalanced (all branches on one side), in the worst case we may need O(n) space for recursion
 */

const {convertArrayToBinaryTreeLevelOrderTraversal} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
let isSameTree = function(p, q) {
    if (!p && !q) {
        return true;
    } else if (p && q) {
        if (p.val !== q.val) {
            return false;
        }
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
    return false;
};

let tests = [
    {
        params: [
            convertArrayToBinaryTreeLevelOrderTraversal([1,2,3]),
            convertArrayToBinaryTreeLevelOrderTraversal([1,2,3])
        ],
        ans: true
    },
    {
        params: [
            convertArrayToBinaryTreeLevelOrderTraversal([1,2]),
            convertArrayToBinaryTreeLevelOrderTraversal([1,null,2])
        ],
        ans: false
    },
    {
        params: [
            convertArrayToBinaryTreeLevelOrderTraversal([1,2,1]),
            convertArrayToBinaryTreeLevelOrderTraversal([1,1,2])
        ],
        ans: false
    },
];

tests.forEach(test => {
    let res = isSameTree(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
