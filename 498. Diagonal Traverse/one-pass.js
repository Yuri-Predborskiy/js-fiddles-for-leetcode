/*
    Diagonal traverse - go over elements till you reach the end, add every element to result as you walk over them.
    Rotate direction when hitting a wall (outside of array).
    Exit when reaching the last index.
    Manually add last item of the matrix before returning.
 */
const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
let findDiagonalOrder = function(matrix) {
    function reverse() {
        x = -x;
        y = -y;
    }

    if (matrix.length < 1) {
        return [];
    }

    let res = [], row = 0, col = 0, x = 1, y = -1;
    while (res.length < matrix.length * matrix[0].length) {
        res.push(matrix[col][row]);
        row += x;
        col += y;
        if (col < 0 && row < matrix[0].length) {
            reverse();
            col = 0;
        }
        if (row < 0 && col < matrix.length) {
            reverse();
            row = 0;
        }
        if (row >= matrix[0].length) {
            reverse();
            col += 2 * y;
            --row;
        }
        if (col >= matrix.length) {
            reverse();
            row += 2 * x;
            --col;
        }
    }
    return res;
};

let tests = [
    {
        matrix: [
            [ 1, 2, 3 ],
            [ 4, 5, 6 ],
            [ 7, 8, 9 ]
        ],
        ans: [1,2,4,7,5,3,6,8,9]
    },
    {
        matrix: [
            [ 1, 2, 3 ],
        ],
        ans: [ 1, 2, 3 ]
    },
];

tests.forEach(test => {
    let res = findDiagonalOrder(test.matrix);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
