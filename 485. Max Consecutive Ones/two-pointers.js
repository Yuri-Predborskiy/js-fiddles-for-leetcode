/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
    let start = -1, len = 0;
    for (let i = 0; i <= nums.length; i++) {
        if (!nums[i]) {
            if (start > -1) {
                len = Math.max(i - start, len);
                start = -1;
            }
        } else {
            if (start === -1) {
                start = i;
            }
        }
    }
    return len;
};

let tests = [
    { nums: [1,1,0,1,1,1], ans: 3 },
];

tests.forEach(test => {
    let res = findMaxConsecutiveOnes(test.nums);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});

