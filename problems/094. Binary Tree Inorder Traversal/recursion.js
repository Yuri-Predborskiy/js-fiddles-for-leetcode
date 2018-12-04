/*
    Solution copied from LeetCode submissions. Very nice and elegant
 */
const {TreeNode, compareArrays} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
let inorderTraversal = function(root) {
    function helper(curr) {
        if (!curr) return;
        if (curr.left) {
            helper(curr.left);
        }
        results.push(curr.val);
        return helper(curr.right);
    }

    let results = [];
    helper(root);
    return results;
};

let long = new TreeNode('a');
long.left = new TreeNode('b');
long.right = new TreeNode('c');
long.left.left = new TreeNode('d');
long.left.right = new TreeNode('e');
long.left.right.left = new TreeNode('f');
long.right.right = new TreeNode('g');

let tree = new TreeNode(1);
tree.right = new TreeNode(2);
tree.right.left = new TreeNode(3);

let tests = [
    { params: [long], ans:  ['d','b','f','e','a','c','g']},
    { params: [tree], ans:  [1,3,2]},
];

tests.forEach(test => {
    let res = inorderTraversal(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
