/*
    Note: this only works if arrays has no missing values, like [1,2,3,4,4]
    In case array may have missing values, this approach will fail, example: [1,4,4,2,4]
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let sum = 0, max = -Infinity, normal = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        normal += i + 1;
        max = Math.max(max, nums[i]);
    }
    for (let i = nums.length; i > max; i--) {
        normal -= i;
    }
    return (sum - normal) / (nums.length - max);
};

let tests = [
    { nums: [1,3,4,2,2], ans: 2 },
    { nums: [3,1,3,4,2], ans: 3 },
    { nums: [3,1,3,4,2,3,3], ans: 3 },
    { nums: [1,4,4,2,4], ans: 4 },
];

tests.forEach(test => {
    let res = findDuplicate(test.nums);
    let correct = res === test.ans ? 'CORRECT' : 'WRONG!';
    console.log(
        'expected:', test.ans,
        '| calculated:', res,
        '| result is', correct
    );
});
