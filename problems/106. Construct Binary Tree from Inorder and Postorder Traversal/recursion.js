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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
let buildTree = function(inorder, postorder) {
    // last number in post-order traversal array is the root of the tree
    // find root in inorder array. to the left you'll have left sub-tree, to the right you'll have right sub-tree
    // from root of the parent tree in postorder, count number of items in the left sub-tree. this becomes the next post-order
    // repeat from the end till the number of items is zero
    function createSubTree(inStart, inEnd, postStart, postEnd) {
        if (inEnd - inStart <= 0 || postEnd - postStart <= 0) {
            return null;
        }
        const rootVal = postorder[postEnd - 1];
        const inIndex = inorderIndexes[rootVal];
        const leftLength = inIndex - inStart;
        // root - postorder[postEnd - 1]
        // left sub-tree
        // inorder: from inStart -till- inIndex
        // postorder: from postStart -till- postStart + leftLength
        // right sub-tree
        // inorder: from inIndex + 1 -till- inEnd
        // preorder: from postStart + leftLength -till- postEnd - 1
        const root = new TreeNode(rootVal);
        root.left = createSubTree(inStart, inIndex, postStart, postStart + leftLength);
        root.right = createSubTree(inIndex + 1, inEnd, postStart + leftLength, postEnd - 1);

        return root;
    }

    // index pre-order items for faster access
    const preorderIndexes = {};
    for (let i = 0; i < postorder.length; i++) {
        preorderIndexes[postorder[i]] = i;
    }
    // index inorder items for faster access
    const inorderIndexes = {};
    for (let i = 0; i < inorder.length; i++) {
        inorderIndexes[inorder[i]] = i;
    }

    return createSubTree(0, inorder.length, 0, postorder.length);
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
const treeTestExample = new TreeNode(1);
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

const treeTestExampleSimple = new TreeNode(3);
treeTestExampleSimple.left = new TreeNode(9);
treeTestExampleSimple.right = new TreeNode(20);
treeTestExampleSimple.right.left = new TreeNode(15);
treeTestExampleSimple.right.right = new TreeNode(7);

let tests = [
    { params: [[9,3,15,20,7], [9,15,7,20,3]], ans: treeTestExampleSimple },
    // { params: [[1,2,4,11,5,3,6,8,9,7,10], [4,11,2,5,1,8,6,9,3,7,10]], ans: treeTestExample},
];

tests.forEach(test => {
    let res = buildTree(...test.params);
    let correct = compareBinaryTrees(res, test.ans);
    console.log(`expected: '${convertBinaryTreeToString(test.ans)}' | calculated: '${convertBinaryTreeToString(res)}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
