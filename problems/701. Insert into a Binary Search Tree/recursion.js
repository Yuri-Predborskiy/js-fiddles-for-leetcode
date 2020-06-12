/*
Insert into binary search tree
Recursively study each node and find one where a child can be inserted that would not break BST properties
Basically, this is a depth first search algorithm using recursion
At each step we replace left or right branch with itself, after executing recursive function on it
If node exists, it will remain the same.
If it does not exist, a new node will be created and branch will be attached to the tree

Time complexity: O(log(n))
Space complexity: O(1), not considering recursion stack
 */

const {
    TreeNode,
    convertArrayToBinaryTreeLevelOrderTraversal,
    convertBinaryTreeToString
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
 * @param {number} val
 * @return {TreeNode}
 */
let insertIntoBST = function(root, val) {
    if (!root) {
        return new TreeNode(val);
    }

    if (root.val < val) {
        root.right = insertIntoBST(root.right, val);
    } else {
        root.left = insertIntoBST(root.left, val);
    }
    return root;
};

let tests = [
    {
        params: [convertArrayToBinaryTreeLevelOrderTraversal([4,2,7,1,3]), 5],
        ans: convertBinaryTreeToString(convertArrayToBinaryTreeLevelOrderTraversal([4,2,7,1,3,5]))
    },
];

tests.forEach(test => {
    let res = convertBinaryTreeToString(insertIntoBST(...test.params));
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
