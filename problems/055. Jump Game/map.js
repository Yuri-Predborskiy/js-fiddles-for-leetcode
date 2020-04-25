/*
The goal: reach the end of the array by jumping forward at most arr[current_index] spaces.
If array is [0], result is true because you're already at the finish
If the array starts with 0, the result is false because you can't move from the start
(see problem on leetcode for more details and examples)

The idea:
Jump forward as far as you can. If we land on a 0, backtrack your steps.
Mark visited locations so you don't jump from the same place twice.
This way you will check every possible location and only backtrack where necessary.

Time complexity: O(n^2) iterating over several inputs based on data of current input
Space complexity: O(n) to keep a list of visited nodes

This is a very slow solution, but it works.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
let canJump = function(nums) {
    const visited = new Set([0]);
    let i = 0;
    while (i < nums.length - 1 && i >= 0) {
        if (nums[i] === 0) {
            while (visited.has(i)) {
                i--;
            }
        }
        visited.add(i);
        i += nums[i];
    }
    return i >= 0;
};

let tests = [
    {
        params: [[2,3,1,1,4]],
        ans: true,
    },
    {
        params: [[3,2,1,0,4]],
        ans: false,
    },
    {
        params: [[0]],
        ans: true,
    },
    {
        params: [[0,1]],
        ans: false,
    },
    {
        params: [[2,1,0,0]],
        ans: false,
    },
];

tests.forEach(test => {
    let res = canJump(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
