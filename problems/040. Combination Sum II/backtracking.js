/*
Find all combinations of provided numbers that add up to a specified sum
Limitations: Avoid duplicate combinations. Do not use each number from inputs more than once

Solution using classical backtracking algorithm.
Try to add one number to a group, make calculations.
Remove added number from the group, make calculations.
This repeats for every input, causing 2^n calculations in the worst case.
Recursion exit conditions: group sum >= target, or there are no elements left to add

Optimizations:
Sort inputs to simplify calculating duplicates.
    Duplicate outputs will have same order, so we can .join() them and compare to existing results
    Save combinations as strings in a set, then check if future combinations are in the set to avoid duplicates
Reuse same array for all calculations to save space and improve computation speed
    Meaning, first we add next element into group, perform calculations, then pop from group and continue

Time complexity: O(2^n), each input causes two branches of calculations, recursively
Space complexity: O(n) since we reuse same array for all group calculations
 */

const {
    compareMatrices,
} = require('../helper');

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
let combinationSum2 = function(candidates, target) {
    function helper(index, sum, group) {
        if (sum === target && !combos.has(group.join())) {
            results.push(group.slice());
            combos.add(group.join());
            return;
        }
        if (index >= candidates.length || sum >= target) {
            return;
        }
        group.push(candidates[index]);
        helper(index + 1, sum + candidates[index], group);
        group.pop();
        helper(index + 1, sum, group);
    }

    candidates.sort((a, b) => a - b);
    const results = [];
    const combos = new Set();
    helper(0, 0, []);
    return results;
};

let tests = [
    {
        params: [[10,1,2,7,6,1,5], 8],
        ans: [
            [1, 7],
            [1, 2, 5],
            [2, 6],
            [1, 1, 6]
        ]
    },
    {
        params: [[2,5,2,1,2], 5],
        ans: [
            [1,2,2],
            [5]
        ]
    },
];

tests.forEach(test => {
    let res = combinationSum2(...test.params);
    let correct = compareMatrices(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
