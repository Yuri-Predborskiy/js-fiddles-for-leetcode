const {TreeNode, compareArrays, convertBinaryTreeToString} = require('../helper');
// depth first search, post-order traversal to serialize all items in the tree (make nodes into strings)
// then add all serialized items into a hash table, key = serialized sub-tree. if item already exists, add to result
// return result

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
let findDuplicateSubtrees = function(root) {
    function getTreeKey(root) {
        if (!root) return '#';
        let key = root.val + getTreeKey(root.left) + getTreeKey(root.right);
        if (!hash[key]) {
            hash[key] = 0;
        } else if (hash[key] === 1) {
            res.push(root);
        }
        ++hash[key];

        return key;
    }

    let hash = {}, res = [];
    getTreeKey(root);

    return res;
};

let tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.left = new TreeNode(4);
tree.right.left = new TreeNode(2);
tree.right.left.left = new TreeNode(4);
tree.right.right = new TreeNode(4);

let tests = [
    { param: tree, ans: [tree.left, tree.left.left] },
];

tests.forEach(test => {
    let res = findDuplicateSubtrees(test.param);
    res = res.map(tree => convertBinaryTreeToString(tree));
    let ans = test.ans.map(tree => convertBinaryTreeToString(tree));
    let correct = compareArrays(res, ans);
    console.log(`expected: '${ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
