// for each 1, check X items in the next row, X - 1 items in the next column
// if they are all 1s, increment X by one (check row one by one)
// once a single zero is found, break
//
// time complexity: O((n*m)^2) where n, m = graph sides (lengths). repeating executions for previously checked items
// space complexity: O(1) constant space

/**
 * @param {string[][]} matrix
 * @return {number}
 */
let maximalSquare = function(matrix) {
    function isRowValid(row, colStart, colEnd) {
        if (!matrix[row]) {
            return false;
        }
        for (let c = colStart; c <= colEnd; c++) {
            if (matrix[row][c] !== '1') {
                return false;
            }
        }
        return true;
    }

    function isColumnValid(col, rowStart, rowEnd) {
        if (!matrix[rowStart]) {
            return false;
        }
        for (let r = rowStart; r <= rowEnd; r++) {
            if (matrix[r][col] !== '1') {
                return false;
            }
        }
        return true;
    }

    let max = 0;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            if (matrix[row][col] === '1') {
                let squareSize = 0;
                let isSquareValid = true;
                while (isSquareValid) {
                    squareSize++;
                    isSquareValid =
                        isRowValid(row + squareSize, col, col + squareSize)
                        && isColumnValid(col + squareSize, row, row + squareSize - 1);
                }
                if (squareSize > max) {
                    max = squareSize;
                }
            }
        }
    }

    return max * max;
};

let tests = [
    {
        params: [[
            ["0","0","0","0","0"],
            ["0","0","0","0","0"],
            ["0","0","0","0","1"],
            ["0","0","0","0","0"]
        ]],
        ans: 1,
    },
    {
        params: [[
            ["1","0","1","0","0"],
            ["1","0","1","1","1"],
            ["1","1","1","1","1"],
            ["1","0","0","1","0"]
        ]],
        ans: 4,
    },
    {
        params: [[
            ["1","0","1","0","0"],
            ["1","0","1","1","1"],
            ["1","1","1","1","1"],
            ["1","0","1","1","1"]
        ]],
        ans: 9,
    },
];

tests.forEach(test => {
    let res = maximalSquare(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
