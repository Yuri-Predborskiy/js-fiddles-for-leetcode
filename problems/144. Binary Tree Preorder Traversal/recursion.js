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
 * @return {number[]}
 */
let preorderTraversal = function(root) {
    function calc(root) {
        if (!root) return;
        res.push(root.val);
        if (root.left) calc(root.left);
        if (root.right) calc(root.right);
    }

    let res = [];
    if (root) calc(root);
    return res;
};

/*
todo: implement tree parsing from array
todo: use tree parsing for creating tree tests from arrays (faster and simpler)
Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,2,3]

Input: [3,2,null,null,5,4]
   3
 /  \
2    5
    /
   4

Output: [3,2,5,4]
start
root = 3, followed by left sub-tree
    left root = 2, followed by left sub-tree, followed by right sub-tree
        null, meaning left sub-tree is done
        null, meaning right sub-tree is done
    right root = 5, followed by left sub-tree
        left root = 4, followed by left-sub-tree, followed by right sub-tree
            null, meaning left sub-tree is done
            null, meaning right sub-tree is done
        null, meaning right sub-tree is done
no more elements
finish
 */

let tests = [
    { params: [long], ans:  ['d','b','f','e','a','c','g']},
    { params: [tree], ans:  [1,3,2]},
];

tests.forEach(test => {
    let res = preorderTraversal(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
