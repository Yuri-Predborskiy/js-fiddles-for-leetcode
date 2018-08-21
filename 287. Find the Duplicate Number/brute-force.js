/*
    Brute force solution, O(n^2) time
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    for (let slow = 0; slow < nums.length - 1; slow++) {
        for (let fast = slow + 1; fast < nums.length; fast++) {
            if (nums[slow] === nums[fast]) return nums[slow];
        }
    }
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
