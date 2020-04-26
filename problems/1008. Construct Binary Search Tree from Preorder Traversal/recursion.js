/*
Idea: preorder[0] is the root of the tree. Every element smaller than root is left sub-tree,
    every element > root is right sub-tree.
We can use recursion for left and right sub-trees till we run out of items in the array
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
    if (preorder.length < 1) {
        return null;
    }
    let root = new TreeNode(preorder[0]);
    let left = [], right;
    for (let i = 1; i < preorder.length; i++) {
        if (preorder[i] > root.val) {
            right = preorder.slice(i);
            break;
        }
        left.push(preorder[i]);
    }
    if (left.length > 0) {
        root.left = bstFromPreorder(left);
    }
    if (right && right.length > 0) {
        root.right = bstFromPreorder(right);
    }
    return root;
};

let tests = [
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
