/*
Remove duplicates from sorted array in place. Allow up to 2 repeating elements
Use no extra space

Two pointers approach
Fast pointer looks for the next value that is not the same as current value
Slow pointer looks at value we need to update in place
If number is new or repeated once, replace slow value with fast value
If number is repeating more than once, move fast pointer forward
Exit when fast pointer reaches the end of the array

Test requires special function because we update parameter in-place and still have a return value

Time complexity; O(n)
Space complexity: O(1)
 */

const {
    compareArraysStrictWithinLength,
} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number}
 */
let removeDuplicates = function(nums) {
    if (nums.length < 3) {
        return nums.length;
    }

    let slow = 1;
    let currentValueIsRepeating = false;
    for (let fast = 1; fast < nums.length; fast++) {
        if (currentValueIsRepeating && nums[fast] === nums[fast - 1]) {
            continue;
        }
        currentValueIsRepeating = nums[fast] === nums[fast - 1];
        nums[slow] = nums[fast];
        slow++;
    }
    return slow;
};

let tests = [
    {params: [[1,1,1,2,2,3]], ans: [5, [1,1,2,2,3]]},
    {params: [[0,0,1,1,1,1,2,3,3]], ans: [7, [0,0,1,1,2,3,3]]},
    {params: [[1]], ans: [1, [1]]},
    {params: [[]], ans: [0, []]},
    {params: [[1,1,1,1]], ans: [2, [1,1]]},
];

tests.forEach(test => {
    let res = removeDuplicates(...test.params);
    let correct = res === test.ans[0] && compareArraysStrictWithinLength(test.params[0], test.ans[1], res);
    console.log('expected:', test.ans[0], '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
    if (!correct) {
        console.log('--- expected:', test.params[0].slice(0, res), 'to equal', test.ans[1]);
    }
});
