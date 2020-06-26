/*
Find sum of root-to-leaf paths where number is sequence of digits at each node from roof to each individual leaf

Solution using DFS
Go down the tree collecting numbers on the way, save them as strings
Convert strings to numbers and calculate sum

Time complexity: O(n), we visit each node once
Space complexity: O(n)
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
 * @return {number}
 */
let sumNumbers = function(root) {
    function helper(root, string) {
        if (!root) {
            return;
        }
        string += root.val;
        if (root.left || root.right) {
            helper(root.left, string);
            helper(root.right, string);
        } else {
            result.push(string);
        }
    }
    const result = [];
    let sum = 0;
    helper(root, '');
    for (let i = 0; i < result.length; i++) {
        sum += Number.parseInt(result[i]);
    }
    return sum;
};

let tests = [
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([1,2,3])], ans: 25},
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([4,9,0,5,1])], ans: 1026},
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([])], ans: 0},
];

tests.forEach(test => {
    let res = sumNumbers(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
