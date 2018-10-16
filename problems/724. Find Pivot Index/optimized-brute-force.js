/*
    Brute force approach with optimization.
    First calculate sum of all elements and then use it to compare accumulated sum vs remaining sum.
    Total time complexity O(2n) = O(n)
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
let pivotIndex = function(nums) {
    if (nums.length < 1) return -1;
    let left = 0, right = nums.reduce((sum, item) => sum + item);
    for (let i = 0; i < nums.length; i++) {
        left += nums[i];
        if (left === right) return i;
        right -= nums[i];
    }

    return -1;
};

let tests = [
    { nums: [1, 7, 3, 6, 5, 6] , ans: 3 },
    { nums: [1, 2, 3], ans: -1 },
    { nums: [1,2,3,3], ans: 2 },
    { nums: [1,2,3,4], ans: -1 },
    { nums: [-1,-1,-1,-1,0,1], ans: 1 },
    { nums: [-1,-1,-1,0,1,1], ans: 0, },
    { nums: [-1,-1,0,1,0,-1], ans: 4 },
    { nums: [-1,-1,1,-1,-1,0], ans: 1 },
];

tests.forEach(test => {
    let res = pivotIndex(test.nums);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
