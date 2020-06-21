/*
Calculate minimum health required to reach bottom right corner from top left corner
HP is updated every time you walk into a cell. HP should never drop below 1.

Solution using 2d DP table
Table keeps track of minimum health required in each cell.
Table is calculated from bottom right to top left (bottom up solution)
Two extra rows are added with "infinity" value instead of checking if row and col are within bounds
Final cells (past target) have 1 hp required (your hp should not reach 0)
Each cell is calculated as min(bottom, right) minus(!) current cell value
Meaning, if current cell has negative value, we add it to current cell value
If value is positive, we subtract from minimum hp required (because we don't need as much hp to reach final goal from
    that cell, considering it has a power up bonus that increases health)
If total health required in a cell is below 1, we set it to 1.

Required health will be in starting cell. Minimum will be 1.

Time complexity: O(n*m) where n*m = number of rows * columns in dungeon matrix
Space complexity: O(n*m)
Optimizations:
Space complexity to O(n) - if we use 1D table
Space complexity to O(1) if we use dungeon as DP table

Solution inspired by the following discussion:
https://leetcode.com/problems/dungeon-game/discuss/52774/C++-DP-solution
 */

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
let calculateMinimumHP = function(dungeon) {
    const dp = new Array(dungeon.length + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(dungeon[0].length + 1).fill(Infinity);
    }
    dp[dungeon.length - 1][dungeon[0].length] = dp[dungeon.length][dungeon[0].length - 1] = 1;
    for (let row = dungeon.length - 1; row >= 0; row--) {
        for (let col = dungeon[0].length - 1; col >= 0; col--) {
            const hpNeeded = Math.min(dp[row][col + 1], dp[row + 1][col]) - dungeon[row][col];
            dp[row][col] = Math.max(hpNeeded, 1);
        }
    }
    return dp[0][0];
};

let tests = [
    {params: [[[-2,-3,3],[-5,-10,1],[10,30,-5]]], ans: 7},
    {params: [[[1,-3,3],[0,-2,0],[-3,-3,-3]]], ans: 3},
];

tests.forEach(test => {
    let res = calculateMinimumHP(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
