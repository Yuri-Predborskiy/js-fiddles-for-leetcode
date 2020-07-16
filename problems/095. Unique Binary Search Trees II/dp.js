/*
Create all possible unique binary search trees from range 1..n (edge case: n = 0)

Recursive solution with memoization (DP)
Use pre-order traversal and a sorted array of numbers from 1 to n,
    create all possible left sub-trees and right sub-trees from every index
Then use current index as root, and attach every possible left sub-tree and right sub-tree (one at a time) to root
When looking for a sub-tree, check if we've made this sub-tree before. If we have, use pre-calculated sub-tree
If this was a new sub-tree, cache it when we're done processing it.
Save sub-tree combinations in array and return array

Time complexity: O(n!), exponential, approximate
Space complexity: O(n!), exponential, approximate
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

        let key = start + ':' + end;
        if (memo[key]) {
            return memo[key];
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
        memo[key] = trees;
        return trees;
    }

    const memo = {};
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
    {
        params: [5],
        ans: [
            [1,null,2,null,3,null,4,null,5],
            [1,null,2,null,3,null,5,4],
            [1,null,2,null,4,3,5],
            [1,null,2,null,5,3,null,null,4],
            [1,null,2,null,5,4,null,3],
            [1,null,3,2,4,null,null,null,5],
            [1,null,3,2,5,null,null,4],
            [1,null,4,2,5,null,3],
            [1,null,4,3,5,2],
            [1,null,5,2,null,null,3,null,4],
            [1,null,5,2,null,null,4,3],
            [1,null,5,3,null,2,4],
            [1,null,5,4,null,2,null,null,3],
            [1,null,5,4,null,3,null,2],
            [2,1,3,null,null,null,4,null,5],
            [2,1,3,null,null,null,5,4],
            [2,1,4,null,null,3,5],
            [2,1,5,null,null,3,null,null,4],
            [2,1,5,null,null,4,null,3],
            [3,1,4,null,2,null,5],
            [3,1,5,null,2,4],
            [3,2,4,1,null,null,5],
            [3,2,5,1,null,4],
            [4,1,5,null,2,null,null,null,3],
            [4,1,5,null,3,null,null,2],
			[4,2,5,1,3],
			[4,3,5,1,null,null,null,null,2],
			[4,3,5,2,null,null,null,1],
			[5,1,null,null,2,null,3,null,4],
			[5,1,null,null,2,null,4,3],
			[5,1,null,null,3,2,4],
			[5,1,null,null,4,2,null,null,3],
			[5,1,null,null,4,3,null,2],
			[5,2,null,1,3,null,null,null,4],
			[5,2,null,1,4,null,null,3],
			[5,3,null,1,4,null,2],
			[5,3,null,2,4,1],
			[5,4,null,1,null,null,2,null,3],
			[5,4,null,1,null,null,3,2],
			[5,4,null,2,null,1,3],
			[5,4,null,3,null,1,null,null,2],
			[5,4,null,3,null,2,null,1]
        ]
    }
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
