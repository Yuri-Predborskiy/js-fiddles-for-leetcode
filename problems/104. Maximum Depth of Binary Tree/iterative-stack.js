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
 * @return {number}
 */
let maxDepth = function(root) {
    const stack = [];
    let max = 0;
    if (root) {
        stack.push({root, depth: 1});
        max++;
    }
    while (stack.length > 0) {
        const {root, depth} = stack.pop();
        if (max < depth) {
            max = depth;
        }
        if (root.left) {
            stack.push({root: root.left, depth: depth + 1});
        }
        if (root.right) {
            stack.push({root: root.right, depth: depth + 1});
        }
    }
    return max;
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
