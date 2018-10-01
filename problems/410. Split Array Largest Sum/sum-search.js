const _ = require('lodash');
const helper = require('../helper');
const LOGGING = true;
helper.log = _.partial(helper.log, LOGGING);

/*
    Optimized brute-force approach:
    check if array can be broken into m pieces no larger than pre-calculated sum. if not, increase sum
    inputs are guaranteed to be break-able into specified number of sub-arrays with known max sum which we have to find
    thus, this should always yield a proper solution
    optimization: starting point should be the largest element in array
    optimization: if number of sub arrays is greater than m, skip calculations (sum too small)

    This solution is rather slow but it is significantly faster than pure brute force approach
 */

/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
let splitArray = function(nums, m) {
    function getMaxItem() {
        let max = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > max) {
                max = nums[i];
            }
        }
        return max;
    }

    function arraySumReducer(accumulator, currentValue) {
        return accumulator + currentValue;
    }

    function getNumberOfBreakpoints(limit) {
        let breaks = 1;
        for (let i = 0, sum = 0; i < nums.length; i++) {
            sum += nums[i];
            if (sum > limit) {
                sum = nums[i];
                breaks++;
            }
            if (breaks > m) {
                // early exit
                return breaks;
            }
        }
        return breaks;
    }

    let sum = nums.reduce(arraySumReducer);

    if (m === 1) {
        return sum;
    }
    if (m === nums.length) {
        return getMaxItem();
    }

    let max = getMaxItem(), subSum = max, breaks = getNumberOfBreakpoints(subSum);

    while (breaks > m) {
        breaks = getNumberOfBreakpoints(++subSum);
    }

    return subSum;
};

let tests = [
    { nums: [10,5,13,4,8,4,5,11,14,9,16,10,20,8], m: 8, ans: 25 },
    { nums: [7,2,5,10,8], m: 2, ans: 18 },
    { nums: [1,2,3,4,5,6,7,8,9], m: 3, ans: 17 },
    { nums: [1,2147483647], m: 2, ans: 2147483647 },
];

tests.forEach(test => {
    let res = splitArray(test.nums, test.m);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
