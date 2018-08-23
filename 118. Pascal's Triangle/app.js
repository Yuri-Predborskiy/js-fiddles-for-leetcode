/*
    Pascal's Triangle build triangle based on numbers in the row above current row.
*/
const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number} numRows
 * @return {number[][]}
 */
let generate = function(numRows) {
    if (numRows < 1) {
        return [];
    }

    let res = [[1]], limit = 2;
    for (let i = 1; i < numRows; ++i) {
        res.push([1]);
        for (let j = 1; j < limit; ++j) {
            let item = res[i];
            if (j === limit - 1) {
                item.push(1);
            } else {
                item.push(res[i-1][j-1] + (res[i-1][j] || 0));
            }
        }
        ++limit;
    }
    return res;
};

let tests = [
    {
        numRows: 1,
        ans: [
            [1],
        ]
    },
    {
        numRows: 2,
        ans: [
            [1],
            [1,1],
        ]
    },
    {
        numRows: 4,
        ans: [
            [1],
            [1,1],
            [1,2,1],
            [1,3,3,1],
        ]
    },
    {
        numRows: 5,
        ans: [
            [1],
            [1,1],
            [1,2,1],
            [1,3,3,1],
            [1,4,6,4,1]
        ]
    },
];

tests.forEach(test => {
    let res = generate(test.numRows);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
