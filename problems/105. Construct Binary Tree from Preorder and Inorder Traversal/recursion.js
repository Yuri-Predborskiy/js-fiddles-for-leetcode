// this solution expects binary tree to have no duplicate values

const {TreeNode, compareBinaryTrees, convertBinaryTreeToString} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
let buildTree = function(preorder, inorder) {
    // first symbol in pre-order traversal array is the root of the tree
    // find root in inorder array. to the left you'll have left sub-tree, to the right you'll have right sub-tree
    // from root of the parent tree in preorder, count number of items in the left sub-tree. this becomes the next pre-order
    // repeat from the start till the number of items is zero
    function createSubTree(preStart, preEnd, inStart, inEnd) {
        if (preEnd - preStart <= 0 || inEnd - inStart <= 0) {
            return null;
        }
        const rootVal = preorder[preStart];
        const inIndex = inorderIndexes[rootVal];
        const leftLength = inIndex - inStart;
        // root - preorder[preStart]
        // left sub-tree
        // preorder: from preStart + 1 -till- preStart + 1 + length
        // inorder: from inStart -till- inIndex - 1
        // right sub-tree
        // preorder: from preStart + 1 + length -till- preEnd
        // inorder: from inIndex + 1 -till- inEnd
        const root = new TreeNode(rootVal);
        // find inorder index from preorder[preStart]
        root.left = createSubTree(preStart + 1, preStart + 1 + leftLength, inStart, inIndex);
        root.right = createSubTree(preStart + 1 + leftLength, preEnd, inIndex + 1, inEnd);

        return root;
    }

    // index pre-order items for faster access
    const preorderIndexes = {};
    for (let i = 0; i < preorder.length; i++) {
        preorderIndexes[preorder[i]] = i;
    }
    // index inorder items for faster access
    const inorderIndexes = {};
    for (let i = 0; i < inorder.length; i++) {
        inorderIndexes[inorder[i]] = i;
    }

    return createSubTree(0, preorder.length, 0, inorder.length);
};

/*
Input:
preorder: [1,2,4,11,5,3,6,8,9,7,10]
inorder: [4,11,2,5,1,8,6,9,3,7,10]
Output:
         1
       /   \
     /      \
    2        3
   / \      / \
  4   5    6   7
   \      / \   \
   11    8   9  10

let t = new TreeNode(1);
t.left = new TreeNode(2);
t.left.left = new TreeNode(4);
t.left.left.right = new TreeNode(11);
t.left.right = new TreeNode(5);
t.right = new TreeNode(3);
t.right.left = new TreeNode(6);
t.right.left.left = new TreeNode(8);
t.right.left.right = new TreeNode(9);
t.right.right = new TreeNode(7);
t.right.right.right = new TreeNode(10);

test:
    { params: [t], ans: []},

Output: true, because 5->4->11->2 = 22
 */
let treeTestExample = new TreeNode(1);
treeTestExample.left = new TreeNode(2);
treeTestExample.left.left = new TreeNode(4);
treeTestExample.left.left.right = new TreeNode(11);
treeTestExample.left.right = new TreeNode(5);
treeTestExample.right = new TreeNode(3);
treeTestExample.right.left = new TreeNode(6);
treeTestExample.right.left.left = new TreeNode(8);
treeTestExample.right.left.right = new TreeNode(9);
treeTestExample.right.right = new TreeNode(7);
treeTestExample.right.right.right = new TreeNode(10);

let tests = [
    { params: [[1,2,4,11,5,3,6,8,9,7,10], [4,11,2,5,1,8,6,9,3,7,10]], ans: treeTestExample},
];

tests.forEach(test => {
    let res = buildTree(...test.params);
    let correct = compareBinaryTrees(res, test.ans);
    console.log(`expected: '${convertBinaryTreeToString(test.ans)}' | calculated: '${convertBinaryTreeToString(res)}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
