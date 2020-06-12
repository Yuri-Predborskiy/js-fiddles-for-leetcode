/*
Rotate matrix by 90 degrees clockwise without using extra memory in O(n) time
Simply rotate elements in counter-clockwise order!
This way we can use only one temp variable at a time.

Example on a 2x2 matrix:
Grab the top left item and put it into temp
Take bottom left item and put it into top left slot
Take bottom right item and put it into bottom left slot
Take top right item and put it into bottom right slot
Take temp and put it into top right slot

At this point we're done with 2x2 matrix. In order to rotate a longer row, simply add shift
In this case top left becomes top left + 1 column element
Then take last row - 1
Then take last row - 1, last col - 1
Then take last col - 1
And so on.

For larger matrices (4x4 and bigger) we also have to process inner matrices, for that add starting shift
The function to rotate one row has been added for convenience. This way we can rotate every inner row separately

Time complexity: O(n)
Space complexity: O(1)
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
let rotate = function(matrix) {
    function rotateRow(start) {
        const limit = matrix.length - start - 1;
        for (let shift = 0; shift < limit - start; shift++) {
            const temp = matrix[start][start + shift];
            matrix[start][start + shift] = matrix[limit - shift][start];
            matrix[limit - shift][start] = matrix[limit][limit - shift];
            matrix[limit][limit - shift] = matrix[start + shift][limit];
            matrix[start + shift][limit] = temp;
        }
    }

    let startIndex = 0;
    const finish = Math.floor((matrix.length) / 2);
    while (startIndex < finish) {
        rotateRow(startIndex);
        startIndex++;
    }
};

let tests = [
    {
        params: [[
            []
        ]],
        ans: [
            []
        ]
    },
    {
        params: [[
            [1,2],
            [4,5]
        ]],
        ans: [
            [4,1],
            [5,2]
        ]
    },
    {
        params: [[
            [1,2,3],
            [4,5,6],
            [7,8,9]
        ]],
        ans: [
            [7,4,1],
            [8,5,2],
            [9,6,3]
        ]
    },
    {
        params: [[
            [ 5, 1, 9,11],
            [ 2, 4, 8,10],
            [13, 3, 6, 7],
            [15,14,12,16]
        ]],
        ans: [
            [15,13, 2, 5],
            [14, 3, 4, 1],
            [12, 6, 8, 9],
            [16, 7,10,11]
        ]
    },
];

tests.forEach(test => {
    rotate(...test.params);
    let res = test.params[0];
    let correct = compareMatricesStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
