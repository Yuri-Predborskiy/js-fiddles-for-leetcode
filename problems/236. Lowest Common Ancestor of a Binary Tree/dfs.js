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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
let lowestCommonAncestor = function(root, p, q) {
    function searchNode(root, params = {}) {
        if (params.ancestor || !root) {
            return params;
        }

        if (root === p) {
            params.foundP = true;
        } else if (root === q) {
            params.foundQ = true;
        }
        if (params.foundP && params.foundQ) {
            return {ancestor: root};
        }
        // we haven't found one or both of our nodes
        const paramsLeft = searchNode(root.left);
        if (paramsLeft.ancestor) {
            return paramsLeft;
        }
        params = {...params, ...paramsLeft};
        if (params.foundP && params.foundQ) {
            return {ancestor: root};
        }

        const paramsRight = searchNode(root.right);
        if (paramsRight.ancestor) {
            return paramsRight;
        }
        params = {...params, ...paramsRight};
        if (params.foundP && params.foundQ) {
            return {ancestor: root};
        }

        return params;
    }
    const result = searchNode(root);
    if (result.ancestor) {
        return result.ancestor;
    }
    return null;
};

/*
Input: [1,2,3,4,5,6,7]
       1 --> null
     /  \
   /     \
  2 ---> 3 --> null
 / \    / \
4-->5->6-->7 --> null
 */
let tree = new TreeNode(3);
tree.left = new TreeNode(5);
tree.right = new TreeNode(1);
tree.left.left = new TreeNode(6);
tree.left.right = new TreeNode(2);
tree.left.right.left = new TreeNode(7);
tree.left.right.right = new TreeNode(4);
tree.right.left = new TreeNode(0);
tree.right.right = new TreeNode(8);

let tests = [
    { params: [tree, tree.left, tree.right], ans: tree},
    { params: [tree, tree.left, tree.left.right.right], ans: tree.left},
];

tests.forEach(test => {
    let res = lowestCommonAncestor(...test.params);
    let correct = res.val === test.ans.val;
    console.log(`expected: '${test.ans.val}' | calculated: '${res.val}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
