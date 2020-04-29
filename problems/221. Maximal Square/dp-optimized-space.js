// dp solution that does not edit inputs, optimized space complexity
// time complexity: O(n*m) where n, m = graph sides (lengths), single pass
// space complexity: O(n) (dp table is as large as one side of the matrix)

/**
 * @param {string[][]} matrix
 * @return {number}
 */
let maximalSquare = function(matrix) {
    let max = 0, prev = 0;
    const dp = new Array(matrix[0].length).fill(0);
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            if (matrix[row][col] === '1') {
                let temp = dp[col] || 0;
                dp[col] = Math.min(temp, prev, dp[col-1] || 0) + 1;
                prev = temp;
                if (dp[col] > max) {
                    max = dp[col];
                }
            } else {
                dp[col] = 0;
            }
        }
    }
    return max * max;
};

let tests = [
    {
        params: [[
            ["1","0","1","1","1"],
            ["0","1","0","1","0"],
            ["1","1","0","1","1"],
            ["1","1","0","1","1"],
            ["0","1","1","1","1"]
        ]],
        ans: 4,
    },
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
