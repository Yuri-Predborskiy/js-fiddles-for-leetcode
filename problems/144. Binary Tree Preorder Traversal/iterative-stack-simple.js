// a simpler, more readable version of iterative-stack, without using extra functions

const {TreeNode, compareArraysStrict} = require('../helper');

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
let preorderTraversal = function(root) {
    // order: root, left, right
    // save root value to output, then process left, then process right
    // one step: process root, then add right to stack, then add left to stack (removed in opposite order)
    // start: add root to stack, if it exists
    const output = [];
    const stack = [];

    if (root) {
        stack.push(root);
    }

    while (stack.length > 0) {
        const node = stack.pop();
        output.push(node.val);

        if (node.right) {
            stack.push(node.right);
        }

        if (node.left) {
            stack.push(node.left);
        }
    }

    return output;
};

/*
Input: [1,null,2,3]
        a
     /    \
    b      c
  /  \      \
 d    e      g
     /
   f

Output: [a,b,d,e,f,c,g]
 */
let longTree = new TreeNode('a');
longTree.left = new TreeNode('b');
longTree.right = new TreeNode('c');
longTree.left.left = new TreeNode('d');
longTree.left.right = new TreeNode('e');
longTree.left.right.left = new TreeNode('f');
longTree.right.right = new TreeNode('g');

/*
Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,2,3]
 */
let tree = new TreeNode(1);
tree.right = new TreeNode(2);
tree.right.left = new TreeNode(3);

let tests = [
    { params: [longTree], ans:  ['a','b','d','e','f','c','g']},
    { params: [tree], ans:  [1, 2, 3]},
];

tests.forEach(test => {
    let res = preorderTraversal(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
