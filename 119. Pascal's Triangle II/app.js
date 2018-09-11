/*
    Pascal's Triangle II - get row from Pascal's triangle. Don't use extra space outside of prev. row.
*/
const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
let getRow = function(rowIndex) {
    let last = [1];

    for (let i = 1; i <= rowIndex; ++i) {
        let next = [1];
        for (let j = 1; j <= i; ++j) {
            if (j === i) {
                next.push(1);
            } else {
                next.push(last[j - 1] + last[j]);
            }
        }
        last = next;
    }

    return last;
};

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
let getRowOptimal = function(rowIndex) {
    let row = [1];

    //todo: work from the end of the array, otherwise you'll update previous element before calculating the sum
    for (let i = 1; i <= rowIndex; ++i) {
        for (let j = 1; j <= i; ++j) {
            if (j <= Math.floor((i + 1) / 2)) {
                row[j] = row[j - 1] + (row[j] || 0);
            } else {
                row[j] = row[i - j];
            }
        }
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
