/*
Sort colors (0, 1 or 2) in place in an array in one pass
Sort algorithm is actually "replace with a copy" algorithm
Whenever you find a color of a certain order, replace current item and all later items, starting with last item
This way when you find a 0, you replace third color item, second color item and finally first color item
This way you effectively "move" every item one index forward as you walk along the input
This allows "sorting" to be done in one pass

A two-pass approach would be to count number of each element in 1st pass and insert them in desired order in 2nd pass

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
    let first = 0, second = 0, third = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            nums[third++] = 2;
            nums[second++] = 1;
            nums[first++] = 0;
        } else if (nums[i] === 1) {
            nums[third++] = 2;
            nums[second++] = 1;
        } else if (nums[i] === 2) {
            nums[third++] = 2;
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
