const {compareArraysStrict} = require('../helper');
/*
The algorithm requires us to get a product of all the numbers except the one that is being considered
Division is not allowed. This condition is forced upon the user via tests like: [0, 0], [0, 1]

This is a brute force solution.
For every element in the input, except the current one, calculate product of every element in the input.
Time complexity: O(n^2) (we do O(n) work for every of the O(n) inputs, resulting in O(n*n) work)
Space complexity: O(1) (output array is not counted as extra space)
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let productExceptSelf = function(nums) {
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        let acc = 1;
        for (let j = 0; j < nums.length; j++) {
            if (i === j) {
                continue;
            }
            acc *= nums[j];
        }
        result[i] = acc;
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
