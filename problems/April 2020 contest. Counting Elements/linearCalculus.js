/*
Given an integer array arr, count element x such that x + 1 is also in arr.

If there're duplicates in arr, count them separately.
 */

/**
 * @param {number[]} arr
 * @return {number}
 */
let countElements = function(arr) {
    let dict = new Set(arr);
    let count = 0;
    for (let num of arr) {
        if (dict.has(num + 1)) {
            count++;
        }
    }
    return count;
};

let tests = [
    {
        params: [[1,2,3]],
        ans: 2,
    },
    {
        params: [[1,1,3,3,5,5,7,7]],
        ans: 0,
    },
    {
        params: [[1,3,2,3,5,0]],
        ans: 3,
    },
    {
        params: [[1,1,2,2]],
        ans: 2,
    },
];

tests.forEach(test => {
    let res = countElements(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
