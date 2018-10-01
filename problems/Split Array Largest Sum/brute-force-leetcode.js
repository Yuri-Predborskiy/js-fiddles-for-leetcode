// leetcode version of the code - no helper methods, no logging.

/*
    The brute force approach:
    starting with initial starting positions, study every possible breaking point for sub-arrays
    find max sub-array sum for each sub-array break point
    repeat till you try every possible combination, pure brute force

    Problem of this approach: it is VERY slow. It tests every possible combination. Very thorough.
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

    function updateNextStart() {
        let start, lastUpdatedIndex = null;
        for (start = starts[starts.length - 1]; start >= 0; start--) {
            if (starts[start] < nums.length - (m - start)) {
                lastUpdatedIndex = start;
                starts[start]++;
                break;
            }
        }

        // reset later starts after updating an earlier start
        if (lastUpdatedIndex !==0 && lastUpdatedIndex < starts.length - 1) {
            let next = starts[lastUpdatedIndex] + 1;
            for (let i = lastUpdatedIndex + 1; i < starts.length; i++) {
                starts[i] = next++;
            }
        }
    }

    if (m === 1) {
        return nums.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    if (m === nums.length) {
        return getMaxItem();
    }

    // array contains start indexes, starting with 0 (exit trigger)
    let starts = [0];
    for (let i = 1; i < m; i++) {
        starts.push(i);
    }

    let subSum = 0, minSum = Infinity, maxSubSum = 0;
    while (starts[0] === 0) {
        for (let startIndex = 0; startIndex < starts.length; startIndex++) {
            let finish = starts[startIndex + 1] ? starts[startIndex + 1] : nums.length;
            for (let index = starts[startIndex]; index < finish; index++) {
                subSum += nums[index];
            }
            maxSubSum = Math.max(maxSubSum, subSum);
            subSum = 0;
        }
        if (minSum > maxSubSum) {
            minSum = maxSubSum;
        }
        maxSubSum = 0;
        updateNextStart();
    }

    return minSum;
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
