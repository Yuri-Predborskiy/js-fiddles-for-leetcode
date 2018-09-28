/*
    The brute force approach:
    scan all possible sub-array variants by studying every possible breakpoint that fulfils condition of number of sub-arrays
    example: we need to break array into two sub-arrays (m=2), so study every array element as if it is the breaking
        point of the array (left sub-array and right sub-array)
    Problem: time complexity is rather high, O(n^m) (just a guess, I don't know exact time complexity)

 */

/**
 * @param {number[]} nums
 * @return {number}
 */
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
    { nums: [3,4,5,1,2] , ans: 1 },
    { nums: [4,5,6,7,0,1,2], ans: 0 },
    { nums: [1], ans: 1 },
    { nums: [3,1,2], ans: 1 },
];

tests.forEach(test => {
    let res = findMin(test.nums);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
