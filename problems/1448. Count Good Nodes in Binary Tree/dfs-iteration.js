/*
Depth first search
Dive into the tree looking at each level whether node satisfies conditions

Time complexity: O(n), nodes are not revisited
Space complexity: O(n) for stack, wost case
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
    if (!root) {
        return 0;
    }

    const stack = [{node: root, max: root.val}];
    let paths = 0;
    while (stack.length > 0) {
        let {node, max} = stack.pop();
        if (!node) {
            continue;
        }
        if (node.val >= max) {
            paths++;
        }
        max = Math.max(node.val, max);
        stack.push({node: node.left, max});
        stack.push({node: node.right, max});
    }
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