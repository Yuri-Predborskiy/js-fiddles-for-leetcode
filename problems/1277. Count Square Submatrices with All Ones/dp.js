/*
Count all square submatrices with all Ones
Naive solution would require us to iterate over the matrix to find out the biggest submatrix at each starting point
    by going up and left and diagonally. We would start with 1s (all squares of 1x1 size), followed by looking for
    2x2 squares of 1s, then 3x3 and so on. This is inefficient since we re-calculate smaller squares when calculating
    larger ones. Example: every 3x3 square already contains 4 2x2 squares and 9 1x1 squares.

We can use this property of squares (bigger ones containing smaller ones inside) to our advantage
By keeping a memoization table of previous results (dp table), we can calculate max matrix size for each point
    only by looking at 4 points total - up, left and diagonally up-left
This way we will decrease time complexity to O(nm) - we only iterate over the matrix once.
The drawback of this approach is that we need to make a DP table that is as big as input.

Space complexity can be improved to O(min(n,m)) by only keeping one row of the DP table in memory, plus the "diagonal"
    element (the element in the place we're re-calculating is the "above" element, while diagonal one needs to be kept
    in memory separately). The "min" part can be achieved if we keep the smaller of the two - either one row or one
    column in memory, which ever is smaller. But this would make the code a bit more complex, so I'll skip that

Time complexity: O(nm)
Space complexity: O(nm)
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
let countSquares = function(matrix) {
    const dp = new Array(matrix.length);
    let count = 0;

    for (let row = 0; row < matrix.length; row++) {
        dp[row] = dp[row] || new Array(matrix[0].length);
        for (let col = 0; col < matrix[0].length; col++) {
            if (row === 0 || col === 0 || matrix[row][col] === 0) {
                dp[row][col] = matrix[row][col];
            } else {
                dp[row][col] = Math.min(dp[row - 1][col], dp[row][col - 1], dp[row - 1][col - 1]) + matrix[row][col];
            }
            count += dp[row][col];
        }
    }
    return count;
};

const tests = [
    {
        params:
            [[
                [0,1,1,1],
                [1,1,1,1],
                [0,1,1,1]
            ]],
        ans: 15
    },
    {
        params:
            [[
                [1,0,1],
                [1,1,0],
                [1,1,0]
            ]],
        ans: 7
    },];

for (let test of tests) {
    const res = countSquares(...test.params);
    const correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
}
