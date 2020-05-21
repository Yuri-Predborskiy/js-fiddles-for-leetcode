/*
Count all square submatrices with all Ones
DP solution. For more information see dp.js
By keeping a memoization table of previous results (dp table), we can calculate max matrix size for each point
    only by looking at 4 points total - up, left and diagonally up-left
This way we will decrease time complexity to O(nm) - we only iterate over the matrix once.
The drawback of this approach is that we need to use extra space for DP table.

Current solution has minimized extra space usage. DP table as big as min(row, col) of matrix.
In case when matrix rows are longer than columns, we traverse over columns of the matrix, one row at a time
In case when matrix columns are longer than rows, matrix is traversed as if it was transposed (flipped flag),
    meaning we traverse over rows, one column at a time
This requires a bit of extra complexity (flipped flag and using it to read matrix[row][col] or matrix[col][row])

Time complexity: O(nm)
Space complexity: O(n)
 */

/**
 * @param {number[][]} matrix
 * @return {number}
 */
let countSquares = function(matrix) {
    let previousDiagonalElement;
    let count = 0;
    const rows = Math.max(matrix.length, matrix[0].length);
    const cols = Math.min(matrix.length, matrix[0].length);
    const flipped = rows !== matrix.length;
    const dp = new Array(cols);

    for (let row = 0; row < rows; row++) {
        previousDiagonalElement = dp[0];
        for (let col = 0; col < cols; col++) {
            if (row === 0 || col === 0 || (flipped ? matrix[col][row] : matrix[row][col]) === 0) {
                dp[col] = flipped ? matrix[col][row] : matrix[row][col];
            } else {
                const temp = dp[col];
                dp[col] = Math.min(temp, dp[col - 1], previousDiagonalElement) +
                    (flipped ? matrix[col][row] : matrix[row][col]);
                previousDiagonalElement = temp;
            }
            count += dp[col];
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
    },
    {
        params:
            [[
                [0,0,0],
                [0,1,0],
                [0,1,0],
                [1,1,1],
                [1,1,0]
            ]],
        ans: 8
    },
];

for (let test of tests) {
    const res = countSquares(...test.params);
    const correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
}
