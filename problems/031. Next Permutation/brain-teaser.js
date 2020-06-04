/*
Make next lexicographically bigger number from number represented as an array
Solution requires prior knowledge (in my humble opinion)
Algorithm is incomprehensible if you didn't solve this kind of question before

Translated from Java since official solution explains it wrongly

Time complexity: O(n) (kind of)
Space complexity: O(1) (modification is done in-place)
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let nextPermutation = function(nums) {
    function swap(left, right) {
        let temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
    }

    function reverse(start) {
        const last = nums.length - 1;
        for (let i = 0; i <= Math.floor((last - start) / 2); i++) {
            swap(start + i, last - i);
        }
    }

    for (let firstDecreasing = nums.length - 2; firstDecreasing >= 0; firstDecreasing--) {
        if (nums[firstDecreasing] < nums[firstDecreasing + 1]) {
            let nextBiggerIndex = nums.length - 1;
            while (nextBiggerIndex > firstDecreasing && nums[nextBiggerIndex] <= nums[firstDecreasing]) {
                nextBiggerIndex--;
            }
            swap(firstDecreasing, nextBiggerIndex);
            reverse(firstDecreasing + 1);
            return;
        }
    }

    reverse(0);
};

let tests = [

    {params: [[2,1,2,2,2,2,2,1]], ans: [2,2,1,1,2,2,2,2]},
    {params: [[2,3,1,3,3]], ans: [2,3,3,1,3]},
    {params: [[2,3,1]], ans: [3,1,2]},
    {params: [[1,4,2,4,3]], ans: [1,4,3,2,4]},
    {params: [[1,3,2]], ans: [2,1,3]},
    {params: [[1,2,3]], ans: [1,3,2]},
    {params: [[3,2,1]], ans: [1,2,3]},
    {params: [[1,1,5]], ans: [1,5,1]},
    {params: [[1,5,1]], ans: [5,1,1]},
];

tests.forEach(test => {
    nextPermutation(...test.params);
    let res = test.params[0];
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
