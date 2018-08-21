/*
    This approach requires ability to modify the input array.
    If input is read-only, you have to create a copy of array (memory limit: O(n)).
    Time complexity: O(NlogN) (sorting) and subsequent O(n) to find duplicate, O(NlogN) total
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    nums.sort((a, b) => a > b ? 1 : -1);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i-1]) return nums[i];
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
