/*
Find all combinations of 3 elements that add up to 0
Avoid duplicates

Sort solution. Sort array, then pick one number and find two more that all add up to 0

Time complexity: O(n^2)
Space complexity: O(n)
 */

const {compareArrays} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const zeroMap = new Map();
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                const min = Math.min(nums[i], nums[left], nums[right]);
                const max = Math.max(nums[i], nums[left], nums[right]);
                zeroMap.set(min + ':' + max, [nums[i], nums[left], nums[right]]);
                left++;
                right--;
                // skip duplicates
                while (nums[left] === nums[left - 1]) {
                    left++;
                }
                while (nums[right] === nums[right + 1]) {
                    right++;
                }
            } else if (sum > 0) {
                right--;
            } else {
                left++;
            }
        }
    }
    return [...zeroMap.values()];
};

let tests = [
    {params: [[-1, 0, 1, 2, -1, -4]], ans: [[-1, 0, 1], [-1, -1, 2]]},
];

tests.forEach(test => {
    let res = threeSum(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
