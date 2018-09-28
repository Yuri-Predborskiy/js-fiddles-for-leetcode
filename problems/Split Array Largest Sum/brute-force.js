/*
    The brute force approach:
    scan all possible sub-array variants by studying every possible breakpoint that fulfils condition of number of sub-arrays
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
        for (let start = starts[starts.length - 1]; start > 0; start--) {
            if (starts[start] < nums.length - (m - start)) {
                starts[start]++;
                return;
            }
        }
    }

    if (m === 1) {
        return nums.reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    if (m === nums.length) {
        return getMaxItem();
    }

    // array contains start indexes, first sub-array always starts from 0 and is not included into starts
    let starts = [0];
    for (let i = 1; i < m; i++) {
        starts.push(i);
    }

    let subSum = 0, minSum = Infinity, maxSubSum = 0;
    // now we have start points for all sub-arrays, calculate sum of every sub-array, log max sum
    // todo: add another loop to increase the next start point, repeat till that start point cannot be moved forward
    // max point: start index + 1 = nums.length - 1
    while (starts[1] < nums.length - (m - 1)) {
        for (let startIndex = 0; startIndex < starts.length; startIndex++) {
            // for every start point
            // calculate sum
            let finish = starts[startIndex + 1] ? starts[startIndex + 1] : nums.length;
            for (let index = starts[startIndex]; index < finish; index++) {
                subSum += nums[index];
                console.log('subSum for index', index, 'is', subSum);
            }
            maxSubSum = Math.max(maxSubSum, subSum);
            console.log('new max sub sum is', maxSubSum);
            subSum = 0;

        }
        // calculated maxSubSum
        /*
        todo: make complex calculations for each group and save it as a report
        one group would include all the info about the whole array, broken into groups:
        each group's start point, end point and sum, and total min-max sum
         */
        minSum = Math.min(minSum, maxSubSum);
        console.log('new min sum is', minSum);
        maxSubSum = 0;
        updateNextStart();
    }

    return minSum;

    // for every item from startIndex to nextStartIndex do the following
    // // calculate sum of all elements in this sub-array, if it is larger than maxSubSum, update maxSubSum
    // when finished, compare maxSubSum with minSum, if maxSubSum is smaller, update minSum with maxSubSum
    // add 1 to last start point (max = length - [starting point index + 1])
    // if last start point is at the edge (cannot be moved forward, add 1 to next start point
    // finish when you can no longer add points



    // max scanning range = nums.length - m, since it is of no use to scan further as min sub-array size is 1
};

let findMin = function(nums) {
    let left = 0, right = nums.length - 1;

    while (left + 1 < right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            left = mid;
        } else {
            right = mid;
        }
    }

    return Math.min(nums[left], nums[right]);
};

let tests = [
    { nums: [10,5,13,4,8,4,5,11,14,9,16,10,20,8], m: 8, ans: 25 },
    // { nums: [7,2,5,10,8], m: 2, ans: 18 },
    // { nums: [1,2,3,4,5,6,7,8,9], m: 3, ans: 17 },
    // { nums: [1,2147483647], m: 2, ans: 2147483647 },
];

tests.forEach(test => {
    let res = splitArray(test.nums, test.m);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
