/*
Find all the ways to build sum from provided candidates. Candidates can be reused, but result arrays should not repeat

Solution using DP, 1D table
For each number check if we can build current sum using current number by looking at [number] indexes back in dp table
Since we start at index [number], we don't need to consider previous results
Special case for sum === number - create new array with number
For other cases look at [number] items back. If there are any elements, slice their variants
    and push current number into each variant, save to temp
If current cell already contains results, push temp into cell results, otherwise replace cell with results
Perform this operation for each number
Return value from the last cell of DP table.

Benefits of 1D solution: uses less space for larger N
Drawbacks of 1D solution: harder to implement

Time complexity: O(targetSum*n*combinations) where n - number of candidates, combinations - number of prev results
    Potentially exponential time complexity, depends on targetSum
Space complexity: O(targetSum * combinations), potentially exponential time complexity, depending on target
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
let combinationSum = function(candidates, target) {
    const dp = [];
    for (let num = 0; num < candidates.length; num++) {
        const candidate = candidates[num];
        dp[candidate] = dp[candidate] || [];
        for (let sum = candidate; sum <= target; sum++) {
            dp[sum] = dp[sum] || [];
            if (sum === candidate) {
                dp[sum].push([candidate]);
            } else if (Array.isArray(dp[sum - candidate])) {
                dp[sum].push(...(dp[sum - candidate].map(c => {
                    const newCombo = c.slice();
                    newCombo.push(candidate);
                    return newCombo;
                })));
            }
        }
    }
    return dp[target] || [];
};

let tests = [
    {params: [[2,3,6,7], 7], ans: [[2,2,3], [7]]},
    {params: [[2,3,5], 8], ans: [[2,2,2,2], [2,3,3], [3,5]]},
    {params: [[2,3,6,7], 1], ans: []},
];

tests.forEach(test => {
    let res = combinationSum(...test.params);
    let correct = compareMatricesStrict(res, test.ans); // note: proper comparison would be "same deep members" in chai
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
