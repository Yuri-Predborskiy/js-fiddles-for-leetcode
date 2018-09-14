/*
    Time complexity: O(n)
    Space complexity: O(n) (making a duplicate of the array with old values at new indexes)
 */

const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let rotate = function(nums, k) {
    for(let i = 0; i < k; i++) nums.unshift(nums.pop());
};

let tests = [
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

