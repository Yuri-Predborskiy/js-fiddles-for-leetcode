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
let inorderTraversal = function(root) {
    const output = [];
    const stack = [];
    const visited = new Set();

    if (root) {
        stack.push(root);
    }

    while (stack.length > 0) {
        const node = stack.pop();

        if (visited.has(node)) {
            output.push(node.val);
            continue;
        }
        visited.add(node);

        if (node.right) {
            stack.push(node.right);
        }

        stack.push(node);

        if (node.left) {
            stack.push(node.left);
        }
    }

    return output;
};

/*
Input: ['f','b','a','d','c','e','g',null,'i','h']
        f
       / \
     /    \
    b      g
  /  \      \
 a    d      i
     / \    /
   c    e  h

Output: ['a','b','c','d','e','f','g','h','i']
 */
let tree = new TreeNode('f');
tree.left = new TreeNode('b');
tree.left.left = new TreeNode('a');
tree.left.right = new TreeNode('d');
tree.left.right.left = new TreeNode('c');
tree.left.right.right = new TreeNode('e');
tree.right = new TreeNode('g');
tree.right.right = new TreeNode('i');
tree.right.right.left = new TreeNode('h');

let tests = [
    { params: [tree], ans:  ['a','b','c','d','e','f','g','h','i']},
];

tests.forEach(test => {
    let res = inorderTraversal(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
