/*
Validate binary search tree without duplicate nodes

Recursive solution
Iterate over tree updating min and max
If any root is more than max or less than min or is duplicate, return false
If all nodes pass the check, return true
If any node fails - return false

Time complexity: O(n) we have to check every node
Space complexity: O(1) outside of recursion stack
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
 * @param {TreeNode} root
 * @return {boolean}
 */
let isValidBST = function(root) {
    function helper(root, min, max) {
        if (!root) {
            return true;
        }
        if (root.val <= min || root.val >= max) {
            return false;
        }
        return helper(root.left, min, root.val) && helper(root.right, root.val, max);
    }
    return helper(root, -Infinity, Infinity);
};

let tests = [
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([2,1,3])], ans: true},
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([5,1,4,null,null,3,6])], ans: false},
];

tests.forEach(test => {
    let res = isValidBST(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
