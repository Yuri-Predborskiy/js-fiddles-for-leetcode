/*
Calculate number of unique paths to get from 0:0 to n:m going only right and down
Course may include obstacles that prevent passage through the cell

Solution using dynamic programming
Every cell represents the number of ways to get into the current cell
It is calculated as a sum of ways to reach a cell on top and number of ways to reach a cell on the left
Return last value in DP table

Time complexity: O(n*m)
Space complexity: O(n*m)
 */

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
let uniquePathsWithObstacles = function(obstacleGrid) {
    if (obstacleGrid[0][0] !== 0 || obstacleGrid[obstacleGrid.length - 1][obstacleGrid[0].length - 1] !== 0) {
        return 0;
    }
    const dp = [];
    for (let row = 0; row < obstacleGrid.length; row++) {
        dp[row] = [];
        for (let col = 0; col < obstacleGrid[0].length; col++) {
            if (row === col && row === 0) {
                dp[row][col] = 1;
                continue;
            }
            if (obstacleGrid[row][col] !== 0) {
                dp[row][col] = 0;
                continue;
            }
            const top = row > 0 ? dp[row - 1][col] : 0;
            const left = col > 0 ? dp[row][col - 1] : 0;
            dp[row][col] = top + left;
        }
    }
    return dp[dp.length - 1][dp[0].length - 1];
};

let tests = [
    {params: [[[0,0,0],[0,1,0],[0,0,0]]], ans: 2},
    {params: [[[1,0]]], ans: 0},
    {params: [[[0,0],[1,1],[0,0]]], ans: 0},
];

tests.forEach(test => {
    let res = uniquePathsWithObstacles(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
