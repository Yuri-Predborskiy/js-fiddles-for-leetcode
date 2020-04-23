const {compareArraysStrict} = require('../helper');
/*
The algorithm requires us to get a product of all the numbers except the one that is being considered
Division is not allowed. This condition is forced upon the user via tests like: [0, 0], [0, 1]

This is a "dual array" solution, or "memoization" approach
Store the product of all items left of the current item in one array
Store the product of all items right of the current item in another array
Iterate over the array once to calculate left side products, once more for right side products
Resulting array is the product of left-side index and right-side index.

Time complexity: O(n) (we iterate over the inputs several times, but the number is constant)
Space complexity: O(n) (we keep two extra arrays with products)
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let productExceptSelf = function(nums) {
    const left = new Array(nums.length), right = new Array(nums.length), result = new Array(nums.length);
    let leftProduct = 1, rightProduct = 1;
    for (let i = 0, j = nums.length - 1; i < nums.length; i++, j--) {
        left[i] = leftProduct;
        leftProduct *= nums[i];
        right[j] = rightProduct;
        rightProduct *= nums[j];
    }
    for (let i = 0; i < nums.length; i++) {
        result[i] = left[i] * right[i];
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
