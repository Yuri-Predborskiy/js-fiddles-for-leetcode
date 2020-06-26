/*
Create all combinations of specified length from numbers 1..n

Recursive solution using backtracking
First, generate an array of numbers
Next, at each recursive step, add one number and process it again
At the end of processing, remove last number and add next number (if available)
Exit condition - number of elements in combination matches expected

Time complexity: O(n*k)
Space complexity: O(n*k)
 */

const {
    compareMatrices,
} = require('../helper');

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
let combine = function(n, k) {
    function helper(index, combination) {
        if (combination.length === k) {
            results.push(combination.slice());
            return;
        }
        for (let i = index; i < n; i++) {
            combination.push(array[i]);
            helper(i + 1, combination);
            combination.pop();
        }
    }

    const array = [];
    for (let i = 1; i <= n; i++) {
        array.push(i);
    }
    if (k === n) {
        return [array];
    }

    const results = [];
    helper(0, []);
    return results;
};

let tests = [
    {params: [4, 2], ans: [[2,4], [3,4], [2,3], [1,2], [1,3], [1,4]]},
    {params: [3, 3], ans: [[1,2,3]]},
    {params: [3, 2], ans: [[1,2],[1,3],[2,3]]},
];

tests.forEach(test => {
    let res = combine(...test.params);
    let correct = compareMatrices(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
