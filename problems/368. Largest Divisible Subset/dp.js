/*
Find a subset of numbers where each number can be deleted (or deletes) another number in the group with no remainder
If there are multiple combinations, return largest subset. Any subset is fine

Naive approach
Try to divide every number by every number. If remainder is 0, add them to a group
Try every other number in the input set to see if they are divisible without remainder
Add every number that satisfies the criteria into the group
Return the largest group
This is very inefficient
Time complexity would be O(n^3) (we will do lots of repetitive calculations for each number in each group)

Optimization:
Number of calculations can be decreased by sorting numbers and trying to divide larger numbers by smaller numbers
Since we need to compare every number with every other number, we cannot go below O(n^2) time complexity
This means sorting won't affect time complexity because it is O(n*log(n)), smaller than O(n^2)

Solution using dynamic programming:
This problem can be broken into smaller repetitive problems: dividing a larger number by a smaller number
Further numbers would require performing repeating calculations
Instead, we can store pre-calculated results in memoization table (dp) and use them instead

The idea: if a larger number is divisible by a smaller number without remainder, it is also divisible by all the smaller
    numbers in the group without remainder, because this larger number can be represented as a combination of
    smaller numbers (example: 8 is divisible by 4, 4 has 2 and 1 in the group, this means that 8 should be divisible by
    2 and 1 because 4 is divisible by these numbers, which means 4 is just a combination of 2+2)
This allows us to perform only 1 recalculation per group.

Time complexity: O(n^2)
Space complexity: O(n)
 */

const {
    compareArrays,
} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let largestDivisibleSubset = function(nums) {
    nums.sort((a, b) => a - b);
    const dp = [];
    for (let fast = 0; fast < nums.length; fast++) {
        dp[fast] = [nums[fast]];
        for (let slow = fast - 1; slow >= 0; slow--) {
            if (nums[fast] % nums[slow] === 0 && dp[fast].length < dp[slow].length + 1) {
                dp[fast] = dp[slow].concat([nums[fast]]);
            }
        }
    }
    let max = [];
    for (let i = 0; i < dp.length; i++) {
        if (dp[i].length > max.length) {
            max = dp[i];
        }
    }
    return max;
};

let tests = [
    {params: [[]], ans: []},
    {params: [[1]], ans: [1]},
    {params: [[1,2,3]], ans: [1,2]},
    {params: [[1,2,4,8]], ans: [1,2,4,8]},
    {params: [[1,2,4,8,16]], ans: [1,2,4,8,16]},
    {params: [[1,2,3,4,5,6]], ans: [1,2,4]},
    {params: [[4,8,10,240]], ans: [4,8,240]},
];

tests.forEach(test => {
    let res = largestDivisibleSubset(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
