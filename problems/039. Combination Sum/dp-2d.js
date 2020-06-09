/*
Find all the ways to build sum from provided candidates. Candidates can be reused, but result arrays should not repeat

Solution using DP
For each number, see if you can build the sum from existing number (by looking at the same row,
    "candidates[index]" steps back, if it exists). If number is greater than current sum, write null.
For each result in respective DP table add current candidate to each result. Then add results for same sum on prev row
Return last item in DP (last row, last col)

Time complexity: O(target*n*combinations) where n - number of candidates, combinations - number of prev results
    Potentially exponential, depends on target
Space complexity: O(target * n * combinations), potentially exponential, depending on target
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
let combinationSum = function(candidates, target) {
    const dp = [[]];
    for (let num = 0; num < candidates.length; num++) {
        dp[num] = [];
        const candidate = candidates[num];
        for (let sum = 0; sum <= target; sum++) {
            if (sum === 0) {
                dp[num][sum] = [[]];
                continue;
            }
            const above = dp[num - 1] ? dp[num - 1][sum] : null;
            const prev = dp[num][sum - candidate] || null; // array or null
            if (sum < candidate) {
                dp[num][sum] = null; // special case, no arrays
            } else if (prev) { // prev is array of numbers that add up to (sum - candidate)
                dp[num][sum] = [];
                for (let p of prev) {
                    dp[num][sum].push(p.slice());
                }
                for (let arr of dp[num][sum]) {
                    arr.push(candidate); // add candidate to each sum to get current sum
                }
            }

            if (!dp[num][sum]) {
                dp[num][sum] = above ? above.slice() : null;
            } else if (above) {
                dp[num][sum].push(...above);
            }
        }
    }
    return dp[dp.length - 1][target] || [];
};

let tests = [
    {params: [[2,3,6,7], 7], ans: [[7], [2,2,3]]},
    {params: [[2,3,5], 8], ans: [[3,5], [2,3,3], [2,2,2,2]]},
    {params: [[2,3,6,7], 1], ans: []},
];

tests.forEach(test => {
    let res = combinationSum(...test.params);
    let correct = compareMatricesStrict(res, test.ans); // note: proper comparison would be "same deep members" in chai
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
