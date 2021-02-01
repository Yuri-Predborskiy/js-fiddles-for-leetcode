/*
Calculate column number based on alphabetical column title

Solution using a simple loop and math.power
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
 * @param {string} s
 * @return {number}
 */
let titleToNumber = function(s) {
    const charCodeBeforeA = 'A'.charCodeAt(0) - 1;
    let result = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        const power = Math.pow(26, s.length - 1 - i);
        result += (s.charCodeAt(i) - charCodeBeforeA) * power;
    }
    return result;
};

let tests = [
    {params: ["A"], ans: 1},
    {params: ["AB"], ans: 28},
    {params: ["ZY"], ans: 701},
    {params: ["FXSHRXW"], ans: 2147483647},
];

tests.forEach(test => {
    let res = titleToNumber(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
