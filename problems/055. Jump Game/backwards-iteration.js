/*
The goal: reach the end of the array by jumping forward at most arr[current_index] spaces.
If array is [0], result is true because you're already at the finish
If the array starts with 0, the result is false because you can't move from the start
(see problem on leetcode for more details and examples)

The idea:
The only way NOT to reach the end is to encounter a 0
This means we should move back from 0 to see if there is an item so that its index + its value is larger than index of 0
This requires O(n^2) time complexity because we have to iterate over the inputs multiple times for each input

Simplification:
Since we will be required to move backwards, it makes sense to move backwards from the finish line right away
This way we don't have backtrack our steps

The idea, simplified:
if we start at the finish of the array (minus one section, the finish line itself) and check if number is positive,
    we will know if we can reach the finish line from that point. As long as we don't encounter 0s, we will reach the start
Once we reach the start, we're done
If we encounter a 0, we just need the previous number to be a minimum of 2 (to jump over the 0), but at this point
    finish is unreachable so set result to false
For each consecutive number that cannot move over 0 plus current item, we increment our minimum jump size by 1
Once we find a number large enough, we reset minimum to 0 and result to true (it is possible to reach the finish)

Once we've iterated through the entire array, we can return result.
It will show whether we're able to reach the end of the array.
No backtracking necessary!

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
let canJump = function(nums) {
    let min = 0, result = true;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] > min) {
            result = true;
            min = 0;
        } else {
            result = false;
            min++;
        }
    }
    return result;
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
];

tests.forEach(test => {
    let res = canJump(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
