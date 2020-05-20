/*
In-order traversal
Drop through the left tree to the bottom. This is 1st smallest
If k > 1, decrement k and return null
if received null, check in-order traversal next node (left, root, right->left)
if received non-null value, return that value
Keep repeating checks and decrementing k till k = 1, then return value

Time complexity: O(n), in the worst case we'll visit all nodes to find the value, in best case it is O(height)
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
 * @param {number} k
 * @return {number}
 */
let kthSmallest = function(root, k) {
    function helper(node) {
        if (!node) {
            return null;
        }

        let left = helper(node.left);
        if (left !== null) {
            return left;
        }
        count--;
        if (count === 0) {
            return node.val;
        }
        return helper(node.right);
    }

    let count = k;
    return helper(root);
};

let tests = [
    {params: [[3,1,4,null,2], 1], ans: 1},
    {params: [[5,3,6,2,4,null,null,1], 3], ans: 3},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 1], ans: 10},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 2], ans: 20},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 3], ans: 21},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 4], ans: 25},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 5], ans: 30},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 6], ans: 35},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 7], ans: 40},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 8], ans: 45},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 9], ans: 50},
    {params: [[50,30,60,20,40,null,null,10,25,35,45,null,null,21], 10], ans: 60},
];

tests.forEach(test => {
    let res = kthSmallest(convertArrayToBinaryTreeLevelOrderTraversal(test.params[0]), test.params[1]);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});