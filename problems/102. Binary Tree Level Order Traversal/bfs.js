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
 * @return {number[][]}
 */
let levelOrder = function(root) {
    const output = [];
    if (!root) return output;
    let level = [root];
    while (level.length > 0) {
        const children = [];
        const values = [];
        for (const node of level) {
            if (node.left) {
                children.push(node.left);
            }
            if (node.right) {
                children.push(node.right);
            }
            values.push(node.val);
        }
        level = children;
        output.push(values);
    }
    return output;
};
/*
Input: [3,9,20,null,null,15,7]
    3
   / \
  9  20
    /  \
   15   7

Output: [
  [3],
  [9,20],
  [15,7]
]
 */
let tree = new TreeNode(3);
tree.left = new TreeNode(9);
tree.right = new TreeNode(20);
tree.right.left = new TreeNode(15);
tree.right.right = new TreeNode(7);

let tests = [
    { params: [tree], ans: [[3], [9,20], [15,7]]},
];

tests.forEach(test => {
    let res = levelOrder(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
