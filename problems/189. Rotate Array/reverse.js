/*
    Time complexity: O(n)
    Space complexity: O(1)
 */

const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let rotate = function(nums, k) {
    k = k % nums.length;
    if (k === 0 || nums.length === 1) return;

    function reverse(start, finish) {
        for (let i = start, j = finish - 1; i < Math.floor((start + finish) / 2); i++, j--) {
            let temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
    }

    reverse(0, nums.length);
    reverse(0, k);
    reverse(k, nums.length);
};

let tests = [
    { nums: [1,2,3,4,5,6], k: 4, ans: [3,4,5,6,1,2] },
    { nums: [1,2,3,4], k: 2, ans: [3,4,1,2] },
    { nums: [1,2,3,4,5,6,7], k:3, ans: [5,6,7,1,2,3,4] },
    { nums: [-1,-100,3,99], k: 2, ans: [3,99,-1,-100] },
    { nums: [-1], k: 2, ans: [-1] },
    { nums: [1,2,3], k: 0, ans: [1,2,3] },
];

tests.forEach(test => {
    let res = test.nums.slice();
    rotate(res, test.k);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

