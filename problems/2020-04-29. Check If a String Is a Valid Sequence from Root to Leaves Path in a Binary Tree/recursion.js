/*
Shorter version of the code, but requires changing of function definition (adding index)

Using recursion, iterate over the binary tree and see if there is a path where val of root matches arr values
If such a path exists, and the last item in the array is also a leaf, return true, else return false
False when we are at the last index of the array and there is either left or right child
false when we reached a leaf and it wasn't the last item
false when we fell off the tree from a leaf before finishing iterating over items in the array
 */

const {convertArrayToBinaryTree} = require('../helper');

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
 * @param {number[]} arr
 * @param {number} index
 * @return {boolean}
 */
let isValidSequence = function(root, arr, index = 0) {
    if (!root || arr[index] !== root.val) {
        return false;
    }
    if (index === arr.length - 1) {
        return !root.left && !root.right;
    }
    return isValidSequence(root.left, arr, index + 1) || isValidSequence(root.right, arr, index + 1);
};

let tests = [
    {
        params: [convertArrayToBinaryTree([0,1,0,null,1,null,null,1,0,null,null,0,null,null,0,0]), [0,1,0,1]],
        ans: true,
    },
    {
        params: [convertArrayToBinaryTree([0,1,0,null,1,null,null,1,0,null,null,0,null,null,0,0]), [0,0,1]],
        ans: false,
    },
    {
        params: [convertArrayToBinaryTree([0,1,0,null,1,null,null,1,0,null,null,0,null,null,0,0]), [0,1,1]],
        ans: false,
    },
];

tests.forEach(test => {
    let res = isValidSequence(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
