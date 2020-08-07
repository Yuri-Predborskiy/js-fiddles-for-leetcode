/*
Create all possible unique binary search trees from range 1..n (edge case: n = 0)

Recursive solution
Use pre-order traversal and a sorted array of numbers from 1 to n,
    create all possible left sub-trees and right sub-trees from every index
Then use current index as root, and attach every possible left sub-tree and right sub-tree (one at a time) to root
Save each tree in an array
Return array

Time complexity: O(n!), exponential, approximate
Space complexity: O(n!), exponential, approximate

In my humble opinion, this problem is rather hard for a "medium" difficulty question
We use a difficult algorithm in a loop
   and then loop through results of recursive medium solutions to build combinations
In my humble opinion, this is question should be considered "hard", not "medium"
Solution inspired by the following discussion:
https://leetcode.com/problems/unique-binary-search-trees-ii/discuss/31494/
 */

const {TreeNode, flattenBinaryTreeLevelOrderTraversal, compareMatrices} = require('../helper');

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
let generateTrees = function(n) {
    function createTrees(start, end) {
        if (start > end) {
            return [null];
        }

        const trees = [];
        for (let i = start; i <= end; i++) {
            const leftTrees = createTrees(start, i - 1);
            const rightTrees = createTrees(i + 1, end);
            for (let left of leftTrees) {
                for (let right of rightTrees) {
                    const root = new TreeNode(i);
                    root.left = left;
                    root.right = right;
                    trees.push(root);
                }
            }
        }
        return trees;
    }

    if (n === 0) {
        return [];
    }
    return createTrees(1, n);
};

let tests = [
    {params: [0], ans: []},
    {params: [1], ans: [[1]]},
    {params: [2], ans: [[1,null,2],[2,1]]},
    {params: [3], ans: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]},
];

// arrays should contain trees saved in level order traversal
function flattenTrees(trees) {
    const results = [];
    for (let root of trees) {
        const arr = flattenBinaryTreeLevelOrderTraversal(root);
        results.push(arr);
    }
    return results;
}

tests.forEach(test => {
    let res = flattenTrees(generateTrees(...test.params));
    let correct = compareMatrices(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
