/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let search = function(nums, target) {
    let left = 0, right = nums.length;
    if (target > nums[right] || target < nums[left]) return -1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (target === nums[mid]) return mid;
        if (target > nums[mid]) left = mid + 1;
        if (target < nums[mid]) right = mid;
    }
    return -1;
};

let tests = [
    { params: [[-1,0,3,5,9,12], 9], ans: 4 },
    { params: [[-1,0,3,5,9,12], 2], ans: -1 },
];

tests.forEach(test => {
    let res = search(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
