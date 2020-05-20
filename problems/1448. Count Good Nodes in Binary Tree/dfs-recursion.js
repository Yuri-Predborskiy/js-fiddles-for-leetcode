/*
Depth first search
Dive into the tree looking at each level whether node satisfies conditions

Time complexity: O(n), nodes are not revisited
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
 * @return {number}
 */
let goodNodes = function(root) {
    function countPaths(node, max) {
        if (!node) {
            return;
        }
        if (node.val >= max) {
            paths++;
        }
        max = Math.max(max, node.val);
        countPaths(node.left, max);
        countPaths(node.right, max);
    }

    if (!root) {
        return 0;
    }

    let paths = 0;
    countPaths(root, root.val);
    return paths;
};

let tests = [
    {params: [3,1,4,3,null,1,5], ans: 4},
    {params: [3,3,null,4,2], ans: 3},
    {params: [1], ans: 1},
];

tests.forEach(test => {
    let res = goodNodes(convertArrayToBinaryTreeLevelOrderTraversal(test.params));
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});