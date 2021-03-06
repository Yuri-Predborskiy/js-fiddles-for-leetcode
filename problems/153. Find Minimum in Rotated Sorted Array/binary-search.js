/**
 * @param {number[]} nums
 * @return {number}
 */
let findMin = function(nums) {
    let left = 0, right = nums.length - 1;

    while (left + 1 < right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            left = mid;
        } else {
            right = mid;
        }
    }

    return Math.min(nums[left], nums[right]);
};

let tests = [
    { nums: [3,4,5,1,2] , ans: 1 },
    { nums: [4,5,6,7,0,1,2], ans: 0 },
    { nums: [1], ans: 1 },
    { nums: [3,1,2], ans: 1 },
];

tests.forEach(test => {
    let res = findMin(test.nums);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
