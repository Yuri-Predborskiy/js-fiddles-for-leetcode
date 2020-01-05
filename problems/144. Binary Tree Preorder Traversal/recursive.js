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
    function processNode(node) {
        output.push(node.val);
        if (node.left) {
            processNode(node.left);
        }
        if (node.right) {
            processNode(node.right);
        }
    }

    const output = [];
    if (root) {
        processNode(root);
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
