const {TreeNode} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
let hasPathSum = function(root, sum) {
    function calculateSum(root, pathSum) {
        if (root) {
            const currentSum = pathSum + root.val;
            if (!root.left && !root.right) {
                return currentSum === sum;
            }
            return calculateSum(root.left, currentSum) || calculateSum(root.right, currentSum);
        }
        return false;
    }

    if (!root) {
        return false;
    }

    return calculateSum(root, 0);
};

/*
Input: [5,4,8,11,null,13,4,7,2,null,null,null,1], 22
      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1

Output: true, because 5->4->11->2 = 22
 */

/*
Input: [1,2], 1
      1
     /
    2
Output: false
 */
let tree = new TreeNode(5);
tree.left = new TreeNode(4);
tree.left.left = new TreeNode(11);
tree.left.left.left = new TreeNode(7);
tree.left.left.right = new TreeNode(2);
tree.right = new TreeNode(8);
tree.right.left = new TreeNode(13);
tree.right.right = new TreeNode(4);
tree.right.right.right = new TreeNode(1);

let treeSmall = new TreeNode(1);
treeSmall.left = new TreeNode(2);

let treeTiny = new TreeNode(1);

let tests = [
    { params: [tree, 22], ans: true},
    { params: [treeSmall, 1], ans: false},
    { params: [], ans: false},
    { params: [treeTiny, 1], ans: true}
];

tests.forEach(test => {
    let res = hasPathSum(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
