/*
Convert sorted array to binary search tree, with balanced height

Solution using recursion by splitting the array in the middle
Middle becomes root
Left tree is built recursively from elements before middle
Right tree is built recursively from elements after middle
Return initial root

Time complexity: O(n)
Space complexity: O(n) for the tree
 */

const {TreeNode, convertArrayToBinaryTreeLevelOrderTraversal, convertBinaryTreeToString} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
let sortedArrayToBST = function(nums) {
    function helper(left, right) {
        if (left > right || left < 0 || right >= nums.length) {
            return null;
        }
        const rootIndex = Math.floor((left + right) / 2);
        const root = new TreeNode(nums[rootIndex]);
        root.left = helper(left, rootIndex - 1);
        root.right = helper(rootIndex + 1, right);
        return root;
    }
    return helper(0, nums.length - 1);
};

let tests = [
    {
        params: [[]],
        ans: convertBinaryTreeToString(
            convertArrayToBinaryTreeLevelOrderTraversal(
                []
            )
        )
    },
    {
        params: [[1]],
        ans: convertBinaryTreeToString(
            convertArrayToBinaryTreeLevelOrderTraversal(
                [1]
            )
        )
    },
    {
        params: [[1,2,3]],
        ans: convertBinaryTreeToString(
            convertArrayToBinaryTreeLevelOrderTraversal(
                [2,1,3]
            )
        )
    },
    {
        params: [[-10,-3,0,5,9]],
        ans: convertBinaryTreeToString(
            convertArrayToBinaryTreeLevelOrderTraversal(
                [0,-10,5,null,-3,null,9]
            )
        )
    },
];

tests.forEach(test => {
    let res = convertBinaryTreeToString(sortedArrayToBST(...test.params));
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
