/*
    Floyd's Tortoise and Hare (Cycle Detection)
    https://leetcode.com/problems/find-the-duplicate-number/solution/
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let slow = nums[0];
    let fast = nums[nums[0]];
    while (slow !== fast)
    {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }

    fast = 0;
    while (fast !== slow)
    {
        fast = nums[fast];
        slow = nums[slow];
    }
    return slow;
};

let tests = [
    { nums: [1,3,4,2,2], ans: 2 },
    { nums: [3,1,3,4,2], ans: 3 },
    { nums: [3,1,3,4,2,3,3], ans: 3 },
    { nums: [1,4,4,2,4], ans: 4 },
];

tests.forEach(test => {
    let res = findDuplicate(test.nums);
    let correct = res === test.ans ? 'CORRECT' : 'WRONG!';
    console.log(
        'expected:', test.ans,
        '| calculated:', res,
        '| result is', correct
    );
});

