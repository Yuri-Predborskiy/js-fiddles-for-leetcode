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
 * @param {number} depth
 * @return {number}
 */
let maxDepth = function(root, depth = 0) {
    if (root) {
        return Math.max(maxDepth(root.left), maxDepth(root.right), 0) + 1;
    }
    return depth;
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

Output: ['a','c','e','d','b','h','i','g','f']
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
    { params: [tree], ans: 4},
];

tests.forEach(test => {
    let res = maxDepth(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
