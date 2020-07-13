/*
Check if two trees have the same structure and values

Iterative solution
If both roots exist - compare their nodes and branches.
If only one root exists - return false.
If values are not identical - return false.
Perform iterative DFS on branches using stack (implemented via array)

Time complexity: O(n)
Space complexity: O(log(n)) average, O(n/2) = O(n) worst case
    If all the right branches have a left leaf, and no other branches exist.
    In this case we'll have around half of the tree in stack, O(n/2) = O(n) space complexity
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
    const stack = [[p, q]];
    while (stack.length > 0) {
        const [leftNode, rightNode] = stack.pop();
        if (leftNode && rightNode) {
            if (leftNode.val !== rightNode.val) {
                return false;
            }
            stack.push([leftNode.left, rightNode.left], [leftNode.right, rightNode.right]);
        } else if (leftNode || rightNode) {
            return false;
        } // else = !leftNode, !rightNode - do nothing
    }
    return true;
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
