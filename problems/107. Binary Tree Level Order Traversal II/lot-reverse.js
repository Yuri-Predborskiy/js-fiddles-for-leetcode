/*
Return level order traversal in opposite order

Solution: perform level order traversal, then reverse the array in place

Time complexity: O(n), both level order traversal and reversal take O(n) time, are performed sequentially
Space complexity: O(n)
 */

const {convertArrayToBinaryTreeLevelOrderTraversal, compareMatricesStrict} = require('../helper');

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
 * @return {number[][]}
 */
let levelOrderBottom = function(root) {
    function dfs(root, index) {
        if (!root) return;
        if (!levels[index]) {
            levels[index] = [root.val];
        } else {
            levels[index].push(root.val);
        }
        dfs(root.left, index + 1);
        dfs(root.right, index + 1);
    }

    const levels = [];
    dfs(root, 0);
    levels.reverse();
    return levels;
};

let tests = [
    {
        params: [
            convertArrayToBinaryTreeLevelOrderTraversal([3,9,20,null,null,15,7])
        ],
        ans: [
            [15,7],
            [9,20],
            [3]
        ]
    },
    {
        params: [
            convertArrayToBinaryTreeLevelOrderTraversal([3,2,1])
        ],
        ans: [
            [2, 1],
            [3]
        ]
    },
    {
        params: [
            convertArrayToBinaryTreeLevelOrderTraversal([])
        ],
        ans: []
    },
];

tests.forEach(test => {
    let res = levelOrderBottom(...test.params);
    let correct = compareMatricesStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
