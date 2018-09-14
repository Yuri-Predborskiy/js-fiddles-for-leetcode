/*
    Spiral Matrix - go over the M*N matrix collecting all elements in a clockwise spiral.
*/
const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
let spiralOrder = function(matrix) {
    function moveForward() {
        if (dir.x > 0) {
            if (pos.col < walls.col.end) {
                // go right
                ++pos.col;
            } else {
                // hit the right wall, rotate and go down, update wall row start
                dir.x = 0;
                dir.y = 1;
                ++pos.row;
                ++walls.row.start;
            }
        } else if (dir.y > 0) {
            if (pos.row < walls.row.end) {
                // go down
                ++pos.row;
            } else {
                // hit the bottom wall, rotate and go left, update wall col end
                dir.y = 0;
                dir.x = -1;
                --pos.col;
                --walls.col.end;
            }
        } else if (dir.x < 0) {
            if (pos.col > walls.col.start) {
                // go left
                --pos.col;
            } else {
                // hit the left wall, rotate and go up, update wall row end
                dir.x = 0;
                dir.y = -1;
                --pos.row;
                --walls.row.end;
            }
        } else if (dir.y < 0) {
            if (pos.row > walls.row.start) {
                // go up
                --pos.row;
            } else {
                // hit the top wall, rotate and go right, update wall col start
                dir.y = 0;
                dir.x = 1;
                ++pos.col;
                ++walls.col.start;
            }
        }
    }

    if (matrix.length < 1) {
        return [];
    }

    let walls = {
        row: { start: 0, end: matrix.length - 1 },
        col: { start: 0, end: matrix[0].length - 1 }
    };
    let dir = { x: 1, y: 0 };
    let pos = { row: 0, col: 0 }, res = [], len = matrix.length * matrix[0].length;
    while (res.length < len) {
        res.push(matrix[pos.row][pos.col]);
        moveForward();
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
        ans: [1,2,3,6,9,8,7,4,5]
    },
    {
        matrix: [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9,10,11,12],
        ],
        ans: [1,2,3,4,8,12,11,10,9,5,6,7]
    },
    {
        matrix: [],
        ans: []
    },
    {
        matrix: [
            [1, 2, 3, 4, 5, 6 ],
            [7, 8, 9, 10,11,12],
            [13,14,15,16,17,18],
            [19,20,21,22,23,24],
        ],
        ans: [1,2,3,4,5,6,12,18,24,23,22,21,20,19,13,7,8,9,10,11,17,16,15,14]
    },
];

tests.forEach(test => {
    let res = spiralOrder(test.matrix);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
