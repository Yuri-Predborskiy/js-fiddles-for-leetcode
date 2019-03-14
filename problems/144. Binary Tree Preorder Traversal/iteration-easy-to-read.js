const {TreeNode, convertArrayToBinaryTree, compareNumberArrays} = require('../helper');

// no trickery approach

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
    let result = [], next = root, stack = [];

    while (next || stack.length) {
        let root = next;
        if (!root || root.val === null) {
            next = stack.pop();
            continue;
        }

        result.push(root.val);
        if (root.left) {
            next = root.left;
            stack.push(root.right);
        } else if (root.right) {
            next = root.right;
        } else {
            next = stack.pop();
        }
    }
    return result;
};

let treeTestCase = new TreeNode(1);
treeTestCase.left = new TreeNode(4);
treeTestCase.left.left = new TreeNode(2);
treeTestCase.right = new TreeNode(3);

let tests = [
    { params: [convertArrayToBinaryTree([1,null,2,3])], ans: [1,2,3] },
    { params: [convertArrayToBinaryTree([3,2,null,null,5,4])], ans:  [3,2,5,4] },
    { params: [treeTestCase], ans: [1,4,2,3] },
];

tests.forEach(test => {
    let res = preorderTraversal(...test.params);
    let correct = compareNumberArrays(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
