/*
Calculate maximum width of a binary tree

Solution using level order traversal of the tree (bfs-like algorithm, traverse one level at a time)
Go down the tree and collect all nodes from the level
Cut off excess nodes on the left and right and make that the next level
Keep track of widest level

Time complexity: O(n)
Space complexity: O(m) where m is the widest level of a binary tree
 */

const {convertArrayToBinaryTreeLevelOrderTraversal} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
let widthOfBinaryTree = function(root) {
    function findFirstElement(array, start, finish, direction) {
        for (let i = start; i !== finish; i += direction) {
            if (array[i] !== null) {
                return i;
            }
        }
        return -1;
    }

    if (!root) {
        return 0;
    }

    let level = [root];
    let max = 1;
    while (level.length > 0) {
        let next = [];
        for (let parent of level) {
            if (!parent) {
                next.push(null, null);
            } else {
                next.push(parent.left, parent.right);
            }
        }
        const first = findFirstElement(next, 0, next.length, 1);
        const last = findFirstElement(next, next.length - 1, -1, -1);
        level = first > -1 ? next.slice(first, last + 1) : [];
        max = Math.max(max, level.length);
    }
    return max;
};

let tests = [
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([1,3,2,5,3,null,9])], ans: 4},
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([])], ans: 0},
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([1])], ans: 1},
    {params: [convertArrayToBinaryTreeLevelOrderTraversal([1,2,3,4,null,null,5,6,null,null,7])], ans: 8},
];

tests.forEach(test => {
    let res = widthOfBinaryTree(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
