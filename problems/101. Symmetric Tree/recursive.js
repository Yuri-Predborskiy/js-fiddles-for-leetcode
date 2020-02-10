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
 * @return {boolean}
 */
let isSymmetric = function(root) {
    function areNodesMirrored(leftRoot, rightRoot) {
        if (!leftRoot && !rightRoot) { // both roots are null
            return true;
        }
        if (!leftRoot || !rightRoot || leftRoot.val !== rightRoot.val) { // nodes are not symmetric or values differ
            return false;
        }

        // repeat this check for sub-trees
        return areNodesMirrored(leftRoot.left, rightRoot.right) && areNodesMirrored(leftRoot.right, rightRoot.left);
    }

    if (!root) {
        return true;
    }

    return areNodesMirrored(root.left, root.right);
};

/*
Input: [1,2,2,3,4,4,3]
         1
       /  \
     /     \
    2       2
  /  \    /  \
 3   4   4    3

Output: true
 */
let goodTree = new TreeNode(1);
goodTree.left = new TreeNode(2);
goodTree.left.left = new TreeNode(3);
goodTree.left.right = new TreeNode(4);
goodTree.right = new TreeNode(2);
goodTree.right.right = new TreeNode(3);
goodTree.right.left = new TreeNode(4);

/*
Input: [1,2,2,null,3,null,3]
         1
       /  \
     /     \
    2       2
     \       \
     3        3

Output: false
 */
const badTree = new TreeNode(1);
badTree.left = new TreeNode(2);
badTree.right = new TreeNode(2);
badTree.left.right = new TreeNode(3);
badTree.right.right = new TreeNode(3);

const veryBad = new TreeNode(1);
veryBad.left = new TreeNode(2);
veryBad.right = new TreeNode(3);

let tests = [
    {params: [goodTree], ans: true},
    {params: [badTree], ans: false},
    {params: [veryBad], ans: false}
];

tests.forEach(test => {
    let res = isSymmetric(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
