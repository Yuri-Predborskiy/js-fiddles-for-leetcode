/*
Sort colors (0, 1 or 2) in place in an array in two passes
Since there are only 3 possible variants of values, we can iterate over the inputs and collect counters of elements
We can then insert them in sorted order into the input array, modifying it in place in O(n) time

This can be improved to a single-pass solution.

Time complexity: O(n)
Space complexity: O(1)
 */

const {
    compareArraysStrict,
} = require('../helper');

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let sortColors = function(nums) {
    const colors = [0, 0, 0];
    for (let n of nums) {
        colors[n]++;
    }
    let index = colors[0] > 0 ? 0 : colors[1] > 0 ? 1 : 2;
    let i = 0;
    while (i < nums.length) {
        index = colors[0] > 0 ? 0 : colors[1] > 0 ? 1 : 2;
        while (colors[index] > 0) {
            nums[i++] = index;
            colors[index]--;
        }
    }
};

let tests = [
    {
        params: [[2,0,2,1,1,0]],
        ans: [0,0,1,1,2,2]
    },
];

tests.forEach(test => {
    sortColors(...test.params);
    let res = test.params[0];
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
