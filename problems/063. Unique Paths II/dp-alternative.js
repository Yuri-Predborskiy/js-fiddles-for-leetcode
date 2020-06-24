/*
Calculate number of unique paths to get from 0:0 to n:m going only right and down
Course may include obstacles that prevent passage through the cell

Solution using dynamic programming
Every cell represents the number of ways to get into the current cell
It is calculated as a sum of ways to reach a cell on top and number of ways to reach a cell on the left
Return last value in DP table

Alternative solution style - first row / column are filled separately from the rest of the table.

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
    dp[0] = new Array(obstacleGrid[0].length).fill(0);
    for (let col = 0; col < obstacleGrid[0].length; col++) {
        if (obstacleGrid[0][col] !== 0) {
            break;
        }
        dp[0][col] = 1;
    }

    for (let row = 1; row < obstacleGrid.length; row++) {
        dp[row] = [0];
        dp[row][0] = obstacleGrid[row][0] === 1 ? 0 : dp[row - 1][0];
    }

    for (let row = 1; row < obstacleGrid.length; row++) {
        for (let col = 1; col < obstacleGrid[0].length; col++) {
            if (obstacleGrid[row][col] === 1) {
                dp[row][col] = 0;
            } else {
                dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
            }
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
