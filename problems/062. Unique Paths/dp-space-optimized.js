/*
Calculate number of unique paths to get from 0:0 to n:m going only right and down

Solution using dynamic programming
Every cell represents the number of ways to get into the current cell
It is calculated as a sum of ways to reach a cell on top and number of ways to reach a cell on the left
Return last value in DP table

Space-optimized solution using less space
Since we only needs previous row of results, we can look at previous result as if it was a result above current

Solution can be optimized further to use min(m, n) at the cost of extra complexity
For this you have to use min(n, m) as dp size and iterate over either rows or cols

Time complexity: O(n*m)
Space complexity: O(n)
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
let uniquePaths = function(m, n) {
    const dp = new Array(m).fill(1);
    for (let row = 1; row < n; row++) {
        for (let col = 1; col < m; col++) {
            dp[col] += dp[col - 1];
        }
    }

    return dp[m - 1];
};

let tests = [
    {params: [3,2], ans: 3},
    {params: [1,1], ans: 1},
    {params: [2,2], ans: 2},
    {params: [3,1], ans: 1},
    {params: [1,3], ans: 1},
    {params: [3,3], ans: 6},
    {params: [4,3], ans: 10},
    {params: [7,3], ans: 28},
];

tests.forEach(test => {
    let res = uniquePaths(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
