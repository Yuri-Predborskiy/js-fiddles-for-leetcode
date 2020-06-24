/*
Create a square matrix of size n, fill it with numbers from 1 to n**2 in a spiral

Algorithm:
Create a function that returns next row, next column based on current row and column
Function uses outside scope variables to keep track of visited cells, changes directions when revisiting a cell
Function changes outside variables when necessary
Function returns next cell's coordinates

Time complexity: O(n^2) since we create n^2 cells and fill them with numbers
Space complexity: O(n^2)
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number} n
 * @return {number[][]}
 */
let generateMatrix = function(n) {
    function getNext(row, col) {
        let dir = dirs[dirIndex];
        let nextRow = row + dir[0];
        let nextCol = col + dir[1];
        if (visited.has(nextRow + ':' + nextCol)) {
            nextRow -= dir[0];
            nextCol -= dir[1];
            dirIndex = (dirIndex + 1) % dirs.length;
            dir = dirs[dirIndex];
            nextRow += dir[0];
            nextCol += dir[1];
        }
        visited.add(nextRow + ':' + nextCol);
        return [nextRow, nextCol];
    }

    const dirs = [[0,1], [1,0], [0,-1], [-1,0]];
    let dirIndex = 0;
    const visited = new Set(['0:' + n, n + ':' + (n - 1), (n - 1) + ':-1']);
    const max = n ** 2;
    let num = 1, row = 0, col = -1;
    const result = new Array(n);
    for (let i = 0; i < n; i++) {
        result[i] = new Array(n);
    }
    while (num <= max) {
        [row, col] = getNext(row, col);
        result[row][col] = num++;
    }
    return result;
};

let tests = [
    {params: [1], ans: [[1]]},
    {params: [2], ans: [[1,2],[4,3]]},
    {params: [3], ans: [[1,2,3],[8,9,4],[7,6,5]]},
    {params: [4], ans: [[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]},
];

tests.forEach(test => {
    let res = generateMatrix(...test.params);
    let correct = compareMatricesStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
