/*
Calculate maximum number of cherries you can collect from a field.
You have two gatherers who start in opposite corners and can move down-left, down, down-right
Your goal is to maximize your total
Collecting from the same spot twice yields no additional results

Solution using recursion + memoization (caching) results

Inspired by other solutions in other languages

Time complexity: O(rows*cols^2)
Space complexity: O(rows*cols^2)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
let cherryPickup = function(grid) {
    function dfs(row, leftCol, rightCol) {
        if (row === rows || leftCol < 0 || leftCol >= cols || rightCol < 0 || rightCol >= cols) {
            return 0;
        }
        if (dp[row][leftCol][rightCol] !== undefined) {
            return dp[row][leftCol][rightCol];
        }
        let cherries = 0;
        let shifts = [-1, 0, 1];
        for (let shiftLeft of shifts) {
            for (let shiftRight of shifts) {
                let leftColNew = Math.min(leftCol + shiftLeft, rightCol + shiftRight);
                let rightColNew = Math.max(leftCol + shiftLeft, rightCol + shiftRight);
                cherries = Math.max(cherries, dfs(row + 1, leftColNew, rightColNew));
            }
        }
        let current = grid[row][leftCol] + grid[row][rightCol];
        if (leftCol === rightCol) {
            current -= grid[row][leftCol];
        }
        dp[row][leftCol][rightCol] = cherries + current;
        return cherries + current;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const dp = [];
    for (let i = 0; i < rows; i++) {
        dp[i] = [];
        for (let j = 0; j < cols; j++) {
            dp[i][j] = [];
        }
    }
    return dfs(0, 0, cols - 1);
};

let tests = [
    {params: [[[3,1,1],[2,5,1],[1,5,5],[2,1,1]]], ans: 24},
    {params: [[[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]], ans: 28},
    {params: [[[1,0,0,3],[0,0,0,3],[0,0,3,3],[9,0,3,3]]], ans: 22},
    {params: [[[1,1],[1,1]]], ans: 4},
];

tests.forEach(test => {
    let res = cherryPickup(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
