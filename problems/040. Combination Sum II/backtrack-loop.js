/*
Find all combinations of provided numbers that add up to a specified sum
Limitations: Avoid duplicate combinations. Do not use each number from inputs more than once

Solution using backtracking with duplicate detection
Duplicate skip is implemented by comparing next element with previous element when doing a 2nd branch
Basically we use sorted inputs as a table of tested combinations

Algorithm is similar to classic recursive backtracking:
Try to add one number to a group, make calculations, remove number. Repeat this procedure in a loop
The difference is: we don't repeat calculations after removing number
Instead, we use a loop to try to add every number from inputs to current group, one number at a time
If there are multiple repeating numbers in inputs, they will come one after another (because we have sorted the inputs)
If a number repeats, we only consider it the first time we encounter it (when we do a recursive call on next element)
If current comparison is not recursive (global index != loop index), we skip duplicate numbers
This takes care of duplicate results problem
Exit conditions: group sum >= target

Optimizations:
Sort inputs and use a loop that does not allow repeating group elements more than once. This removes duplicates
Reuse same array for all calculations, pass it into recursive calls as a reference

Time complexity: O(2^n), each input causes two branches of calculations, recursively
Space complexity: O(n) since we reuse same array for all group calculations

Solution inspired by the following discussion
https://leetcode.com/problems/combination-sum-ii/discuss/16878/Combination-Sum-I-II-and-III-Java-solution-(see-the-similarities-yourself)
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
        if (sum === target) {
            results.push(group.slice());
            return;
        } else if (sum > target) {
            return;
        }

        for (let i = index; i < candidates.length; i++) {
            if (i > index && candidates[i] === candidates[i - 1]) {
                continue;
            }
            if (sum + candidates[i] > target) {
                break;
            }
            group.push(candidates[i]);
            helper(i + 1, sum + candidates[i], group);
            group.pop();
        }
    }

    candidates.sort((a, b) => a - b);
    const results = [];
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
