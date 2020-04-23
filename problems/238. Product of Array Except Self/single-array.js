const {compareArraysStrict} = require('../helper');
/*
The algorithm requires us to get a product of all the numbers except the one that is being considered
Division is not allowed. This condition is forced upon the user via tests like: [0, 0], [0, 1]

This is a "single array = output" solution, where the result array all data is stored directly in output array
See extra-arrays solution for details

Time complexity: O(n) (we iterate over the inputs several times, but the number is constant)
Space complexity: O(1) (we need O(n) for output, but we don't use any more space)
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let productExceptSelf = function(nums) {
    const result = new Array(nums.length);
    let product = 1;
    // calculate left product for each index (product of all numbers to the left of current index)
    for (let i = 0; i < nums.length; i++) {
        result[i] = product;
        product *= nums[i];
    }
    product = 1;
    // calculate right product for each index (product of all numbers to the right of current index)
    for (let i = nums.length - 1; i >= 0; i--) {
        result[i] *= product;
        product *= nums[i];
    }

    return result;
};

let tests = [
    {
        params: [[1,2,3,4]],
        ans: [24,12,8,6],
    },
    {
        params: [[0,0,0,0]],
        ans: [0,0,0,0],
    },
    {
        params: [[1,0]],
        ans: [0,1],
    },
];

tests.forEach(test => {
    let res = productExceptSelf(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
