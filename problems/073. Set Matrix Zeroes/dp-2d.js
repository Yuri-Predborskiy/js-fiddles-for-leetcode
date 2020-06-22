/*
Given matrix, if any cell has a 0 in it, set respective row and column to 0
Edit matrix in-place without using extra space.

Solution using dynamic programming
We use our input as dynamic programming table and make modifications in place
If any cell is 0, replace entire row and column with symbol that is guaranteed not to appear in the matrix ('z')
If any cell to be replaced is 0, skip it for future processing
In the second pass find any 'z' in matrix and replace them with 0

Time complexity: O(n) where n = rows * columns (number of elements in matrix)
Space complexity: O(1)
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
let setZeroes = function(matrix) {
    function zeroCrossMark(row, col) {
        for (let r = 0; r < matrix.length; r++) {
            if (matrix[r][col] !== 0) {
                matrix[r][col] = 'z';
            }
        }
        for (let c = 0; c < matrix[0].length; c++) {
            if (matrix[row][c] !== 0) {
                matrix[row][c] = 'z';
            }
        }
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            if (matrix[row][col] === 0) {
                zeroCrossMark(row, col);
            }
        }
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            if (matrix[row][col] === 'z') {
                matrix[row][col] = 0;
            }
        }
    }
};

let tests = [
    {
        params: [[
            [1,1,1],
            [1,0,1],
            [1,1,1]
        ]],
        ans: [
            [1,0,1],
            [0,0,0],
            [1,0,1]
        ]
    },
    {
        params: [[
            [0,1,2,0],
            [3,4,5,2],
            [1,3,1,5]
        ]],
        ans: [
            [0,0,0,0],
            [0,4,5,0],
            [0,3,1,0]
        ]
    },
];

tests.forEach(test => {
    setZeroes(...test.params);
    let res = test.params[0];
    let correct = compareMatricesStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
