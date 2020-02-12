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
    if (!root) {
        return false;
    }
    const stack = [{root, currentSum: 0}];

    while (stack.length > 0) {
        let {root, currentSum} = stack.pop();
        currentSum += root.val;

        if (!root.left && !root.right && currentSum === sum) {
            return true;
        }
        if (root.left) {
            stack.push({root: root.left, currentSum});
        }
        if (root.right) {
            stack.push({root: root.right, currentSum});
        }
    }
    return false;
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
