/*
First missing integer

Solution inspired by the following discussion with a solution in another language:
https://leetcode.com/problems/first-missing-positive/discuss/17080/Python-O(1)-space-O(n)-time-solution-with-explanation
In short: use your input array as a hash table.
First, clean the input of numbers that are too large or too small
Then, for each number present in the inputs, add input length to respective index
This way if a number is missing in the inputs, respective number will be smaller than added number (input length)

The one drawback of this solution: we destroy the inputs in order to avoid using extra memory

Time complexity: O(3n) = O(n), multiple individual passes over inputs
Space complexity: O(1) since we use input as hash table (hash table solution would be O(n) space)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let firstMissingPositive = function(nums) {
    nums.push(0);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0 || nums[i] >= nums.length) nums[i] = 0;
    }
    for (let i = 0; i < nums.length; i++) {
        const index = nums[i] % nums.length;
        nums[index] += nums.length;
    }
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums.length) return i;
    }
    return nums.length;
};

let tests = [
    {params: [[]], ans: 1},
    {params: [[1]], ans: 2},
    {params: [[2,2]], ans: 1},
    {params: [[2,1]], ans: 3},
    {params: [[1,2,0]], ans: 3},
    {params: [[3,4,-1,1]], ans: 2},
    {params: [[7,8,9,11,12]], ans: 1},
];

tests.forEach(test => {
    let res = firstMissingPositive(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
