/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1;
    if (target > nums[right]) return nums.length;
    if (target < nums[left]) return 0;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (target === nums[mid]) return mid;
        if (target > nums[mid]) left = mid + 1;
        if (target < nums[mid]) right = mid;
    }
    if (target > nums[left]) return left;
    return right;
};

let tests = [
    { params: [[1,3,5,6], 5], ans: 2 },
    { params: [[1,3,5,6], 2], ans: 1 },
    { params: [[1,3,5,6], 7], ans: 4 },
    { params: [[1,3,5,6], 0], ans: 0 },
];

tests.forEach(test => {
    let res = searchInsert(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
