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
    function saveParent(node, parent, nodeArray) {
        if (node) {
            parents.set(node, parent);
            nodeArray.push(node);
            if (!pNode && node === p) {
                pNode = node;
            }
            if (!qNode && node === q) {
                qNode = node;
            }
        }
    }

    function processNodesAndReturnChildren(nodeArray) {
        const children = [];
        for (let i = 0; i < nodeArray.length; i++) {
            if (pNode && qNode) {
                return [];
            }
            const node = nodeArray[i];
            saveParent(node.left, node, children);
            saveParent(node.right, node, children);
        }
        return children;
    }

    if (!root) return root;
    let nodeArray = [root];
    let pNode = p === root ? root : null;
    let qNode = q === root ? root : null;
    const parents = new Map(), visited = new Set();
    parents.set(root, null);

    // iterate over the tree to find both P and Q nodes, while saving parents of each child
    while (nodeArray.length > 0) {
        // having a function allows early exit strategy via return
        nodeArray = processNodesAndReturnChildren(nodeArray);
    }

    // iterate over P and Q parents and mark them as visited. If a node is visited when we find it, return it as it is LCA
    nodeArray = [pNode, qNode];
    let i = 0;
    // conditions guarantee a successful result
    do {
        let node = nodeArray[i];
        if (visited.has(node)) {
            return node;
        }
        visited.add(node);
        if (parents.has(node)) {
            nodeArray.push(parents.get(node));
        }
    } while (i++ < nodeArray.length);
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
