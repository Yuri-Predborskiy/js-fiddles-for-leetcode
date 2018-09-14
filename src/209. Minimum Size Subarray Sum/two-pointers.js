/*
    Potentially O(2n) time complexity, simplified to O(n)
 */
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
let minSubArrayLen = function(s, nums) {
    let len = Infinity;
    for (let fast = 0, slow = 0, sum = 0; fast < nums.length; fast++) {
        sum += nums[fast];
        if (sum >= s) {
            while (sum - nums[slow] >= s && slow < fast) {
                sum -= nums[slow];
                slow++;
            }
            len = Math.min(fast - slow + 1, len);
        }
    }
    return len < Infinity ? len : 0;
};

let tests = [
    { s: 7, nums: [2,3,1,2,4,3], ans: 2 },
    { s: 7, nums: [1,1,1], ans: 0 },
    { s: 15, nums: [1,2,3,4,5], ans: 5 },
];

tests.forEach(test => {
    let res = minSubArrayLen(test.s, test.nums);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

