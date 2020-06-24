/*
Calculate number of unique paths to get from 0:0 to n:m going only right and down

Solution using dynamic programming
Every cell represents the number of ways to get into the current cell
It is calculated as a sum of ways to reach a cell on top and number of ways to reach a cell on the left
Return last value in DP table

Time complexity: O(n*m)
Space complexity: O(n*m)
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
let uniquePaths = function(m, n) {
    const dp = [];
    for (let row = 0; row < n; row++) {
        dp[row] = [];
        for (let col = 0; col < m; col++) {
            if (row === 0 || col === 0) {
                dp[row][col] = 1;
                continue;
            }
            dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
        }
    }

    return dp[n - 1][m - 1];
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
