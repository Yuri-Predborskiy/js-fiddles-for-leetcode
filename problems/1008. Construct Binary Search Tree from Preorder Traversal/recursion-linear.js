/*
Algorithm source:
https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/discuss/598171/Video-Explanation-w-Code

Idea: iterate over inputs once, one item at a time
Only check current item via index. If item is smaller than min or larger than max allowed value, set branch to null.
Left branch should be smaller than current value
Right branch should be larger than current value
Only check value when creating a sub-tree (node).
If sub-tree (tree node) is created, increment index. Otherwise (when returning null) index remains the same
In other words, if current value does not fit into expected range (from min to max), it should be used elsewhere.
All values should fit somewhere in the tree.
 */

const {TreeNode, convertArrayToBinaryTree, convertBinaryTreeToString} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
let bstFromPreorder = function(preorder) {
    function createTree(min, max) {
        if (index >= preorder.length) {
            return null;
        }

        const value = preorder[index];
        if (value < min || value > max) {
            return null;
        }
        const node = new TreeNode(preorder[index++]);
        node.left = createTree(min, value);
        node.right = createTree(value, max);
        return node;
    }

    let index = 0;
    return createTree(-Infinity, Infinity);
};

let tests = [
    {
        params: [[]],
        ans: convertBinaryTreeToString(convertArrayToBinaryTree([])),
    },
    {
        params: [[8,5,1,7,10,12]],
        ans: convertBinaryTreeToString(convertArrayToBinaryTree([8,5,1,null,null,7,null,null,10,null,12])),
    },
    {
        params: [[8,5,1,0,3,7,6,10,9,12,11,18]],
        ans: convertBinaryTreeToString(convertArrayToBinaryTree(
            [8,5,1,0,null,null,3,null,null,7,6,null,null,null,10,9,null,null,12,11,null,null,18]
        )),
    },
    {
        params: [[1]],
        ans: convertBinaryTreeToString(convertArrayToBinaryTree([1])),
    },
    {
        params: [[1,2]],
        ans: convertBinaryTreeToString(convertArrayToBinaryTree([1,null,2])),
    },
];

tests.forEach(test => {
    let res = convertBinaryTreeToString(bstFromPreorder(...test.params));
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
