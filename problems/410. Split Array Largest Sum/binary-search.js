/*
    Binary search sum search:
    instead of checking every possible sum, apply binary search to "find" sum
    left: biggest element
    right: sum of all elements

    time complexity: O(n*log(n))
    log(n) for binary search, n for reading the whole input array to see if it breaks into m pieces with specified sub sum
 */

/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
let splitArray = function(nums, m) {
    function getMaxAndSum() {
        for (let i = 0; i < nums.length; i++) {
            sum += nums[i];
            if (nums[i] > max) {
                max = nums[i];
            }
        }
    }

    function getNumberOfBreakpoints(limit) {
        let breaks = 1, sum = 0;
        for (let i = 0; i < nums.length; i++) {
            sum += nums[i];
            if (sum > limit) {
                sum = nums[i];
                breaks++;
            }
            if (breaks > m) {
                break;
            }
        }
        return breaks;
    }

    let max = 0, sum = 0;
    getMaxAndSum();

    if (m === 1) {
        return sum;
    }
    if (m === nums.length) {
        return max;
    }

    let left = max, right = sum, breaks;
    while (left < right) {
        let mid = Math.floor((right - left) / 2 + left); // prevents overflow
        breaks = getNumberOfBreakpoints(mid);
        if (breaks <= m) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return right;
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
