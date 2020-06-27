/*
Create all possible subsets of given *distinct* integers (the power set), without duplicates

Recursive solution using backtracking
While processing each item, save each possible combination into results
Add one item to combination, process combination recursively, remove item, repeat with next

Time complexity: O(2^n)
Space complexity: O(2^n)
 */

const {
    compareMatrices,
} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let subsets = function(nums) {
    function helper(index, combo) {
        results.push(combo.slice());
        for (let i = index; i < nums.length; i++) {
            combo.push(nums[i]);
            helper(i + 1, combo);
            combo.pop();
        }
    }
    const results = [];
    helper(0, []);
    return results;
};

let tests = [
    {
        params: [[1,2,3]],
        ans: [
            [3],
            [1],
            [2],
            [1,2,3],
            [1,3],
            [2,3],
            [1,2],
            []
        ]
    },
];

tests.forEach(test => {
    let res = subsets(...test.params);
    let correct = compareMatrices(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
