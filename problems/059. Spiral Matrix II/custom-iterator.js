/*
Create a square matrix of size n, fill it with numbers from 1 to n**2 in a spiral

Algorithm:
Create a custom iterator
Custom iterator will return [row, col] - coordinates for the next cell
Iterator keeps track of visited cells and changes direction automatically
Benefits: encapsulation of iterator functionality, iterator can be reused for similar problems
Drawbacks: custom class may have a small performance and memory overhead compared to a function approach

Time complexity: O(n^2) since we create n^2 cells and fill them with numbers
Space complexity: O(n^2)
 */

const {compareMatricesStrict} = require('../helper');

/**
 * @param {number} n
 * @return {number[][]}
 */
let generateMatrix = function(n) {
    const CoordinateIterator = function(limit) {
        this.row = 0;
        this.col = 0;
        this.dirs = [[0,1], [1,0], [0,-1], [-1,0]];
        this.dirIndex = 0;
        this.visited = new Set(['0:0', '0:' + limit, limit + ':' + (limit - 1), (limit - 1) + ':-1']);
    }

    CoordinateIterator.prototype.getNext = function() {
        const result = [this.row, this.col];
        let dir = this.dirs[this.dirIndex];
        this.row += dir[0];
        this.col += dir[1];
        if (this.visited.has(this.row + ':' + this.col)) {
            this.row -= dir[0];
            this.col -= dir[1];
            this.dirIndex = (this.dirIndex + 1) % this.dirs.length;
            dir = this.dirs[this.dirIndex];
            this.row += dir[0];
            this.col += dir[1];
        }
        this.visited.add(this.row + ':' + this.col);
        return result;
    }

    const coordinator = new CoordinateIterator(n);
    const max = n ** 2;
    let num = 1;
    const result = new Array(n);
    for (let i = 0; i < n; i++) {
        result[i] = new Array(n);
    }
    while (num <= max) {
        let [row, col] = coordinator.getNext();
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
