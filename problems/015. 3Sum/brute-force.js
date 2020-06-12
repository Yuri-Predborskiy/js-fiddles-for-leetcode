/*
Find all combinations of 3 elements that add up to 0
Avoid duplicates

Brute force - check all possible combinations
Gets TLE in LeetCode

Time complexity: O(n^3)
Space complexity: O(n)
 */

const {compareArrays} = require('../helper');


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let threeSum = function(nums) {
    const zeroMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                let sum = nums[i] + nums[j] + nums[k];
                if (sum === 0) {
                    // save min and max as key to result, this way results won't repeat
                    const min = Math.min(nums[i], nums[j], nums[k]);
                    const max = Math.max(nums[i], nums[j], nums[k]);
                    zeroMap.set(min + ':' + max, [nums[i], nums[j], nums[k]]);
                }
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
