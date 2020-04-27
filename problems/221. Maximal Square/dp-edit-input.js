// dp solution that edits inputs to save space
// time complexity: O(n*m) where n, m = graph sides (lengths)
// space complexity: O(1) because we overwrite inputs

/**
 * @param {string[][]} matrix
 * @return {number}
 */
let maximalSquare = function(matrix) {
    if (matrix.length < 1) {
        return 0;
    }
    let max = 0;
    for (let row = 1; row < matrix.length; row++) {
        for (let col = 1; col < matrix[0].length; col++) {
            const val = +matrix[row][col];
            if (val > 0) {
                matrix[row][col] = val + Math.min(+matrix[row-1][col-1], +matrix[row-1][col], +matrix[row][col-1]);
            }
            if (matrix[row][col] > max) {
                max = matrix[row][col];
            }
        }
    }
    if (max < 1) {
        for (let row = 0; row < matrix.length; row++) {
            const val = matrix[row][0];
            if (val > max) {
                max = val;
                break;
            }
        }
        for (let col = 0; col < matrix[0].length; col++) {
            const val = matrix[0][col];
            if (val > max) {
                max = val;
                break;
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
