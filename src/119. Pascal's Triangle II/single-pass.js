/*
    Pascal's Triangle II - get row from Pascal's triangle. Don't use extra space outside of prev. row.
*/
const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
let getRow = function(rowIndex) {
    let row = [1];
    if (rowIndex === 0) return row;
    for (let i = 0; i < Math.floor(rowIndex / 2); ++i) {
        row[row.length] = row[i] * (rowIndex - i) / (i + 1);
    }
    for (let i = Math.floor((rowIndex - 1) / 2); i >= 0; --i) {
        row.push(row[i]);
    }
    return row;
};

let tests = [
    { rowIndex: 0, ans: [1] },
    { rowIndex: 1, ans: [1, 1] },
    { rowIndex: 2, ans: [1, 2, 1] },
    { rowIndex: 3, ans: [1, 3, 3, 1] },
    { rowIndex: 4, ans: [1, 4, 6, 4, 1] },
];

tests.forEach(test => {
    let res = getRow(test.rowIndex);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
