/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let fast = 0, slow = 0, len = 0;
    for (fast = 0; fast < nums.length; fast++) {
        if (nums[fast] === val) {
            continue;
        }
        nums[slow] = nums[fast];
        slow++;
        len++;
    }
    return len;
};

let tests = [
    { nums: [0,1,2,2,3,0,4,2], val: 2, ans: 5 }, // todo: compare resulting array ?
];

tests.forEach(test => {
    let res = removeElement(test.nums, test.val);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
