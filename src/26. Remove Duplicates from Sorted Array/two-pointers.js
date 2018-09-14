/**
 * @param {number[]} nums
 * @return {number}
 */
let removeDuplicates = function(nums) {
    let len = 1;
    if (nums.length < 2) return nums.length;
    for (let fast = 1, slow = 0; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            len++;
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return len;
};

let tests = [
    { nums: [1,1,2], ans: 2 },
    { nums: [0,0,1,1,1,2,2,3,3,4], ans: 5 },
];

tests.forEach(test => {
    let res = removeDuplicates(test.nums);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

