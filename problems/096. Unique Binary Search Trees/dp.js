/*
Calculate number of unique binary trees one can create from a row of numbers from 1 to n

Solution using dynamic programming.
Split the input into left and right part, calculate number of trees for each part.
Multiply them for a result in a specific cell to calculate next result
Keep calculating till you find the solution.

Time complexity: O(n^2)
Space complexity: O(n^2)

Solution inspired by the following discussion:
https://leetcode.com/problems/unique-binary-search-trees/discuss/31666/
 */

/**
 * @param {number} n
 * @return {number}
 */
let numTrees = function(n) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }
    return dp[n];
};

let tests = [
    {params: [3], ans: 5},
];

tests.forEach(test => {
    let res = numTrees(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
