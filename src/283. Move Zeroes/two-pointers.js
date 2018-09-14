const compareArrays = require('../helper').compareArrays;

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let moveZeroes = function(nums) {
    let zeroes = 0, slow = 0;
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] === 0) {
            zeroes++;
        } else {
            nums[slow++] = nums[fast];
        }
    }
    for (let i = slow; i < nums.length; i++) {
        nums[i] = 0;
    }
};

let tests = [
    { nums: [0,1,0,3,12], ans: [1,3,12,0,0] },
];

tests.forEach(test => {
    let res = test.nums.slice();
    moveZeroes(res);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
