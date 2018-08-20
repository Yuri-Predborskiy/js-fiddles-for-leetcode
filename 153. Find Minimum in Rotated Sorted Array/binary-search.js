/**
 * @param {number[]} nums
 * @return {number}
 */
let findMin = function(nums) {
    if (nums.length === 1) {
        return nums[0];
    }
    let left = 0, right = nums.length - 1;

    while (left + 1 < right && nums[left] > nums[right]) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            left = mid;
        } else if (nums[mid] < nums[left]) {
            right = mid;
        }
    }

    if (nums[left] < nums[right]) {
        return nums[left];
    } else if (nums[right] < nums[left]) {
        return nums[right];
    }
    return -1;
};

let tests = [
    { nums: [3,4,5,1,2] , ans: 1 },
    { nums: [4,5,6,7,0,1,2], ans: 0 },
    { nums: [1], ans: 1 },
    { nums: [3,1,2], ans: 1 },
    // { nums: ["c", "f", "j"], ans: 'c' },
    // { nums: ["c", "f", "j"], ans: 'c' },
    // { nums: ["e","e","e","e","e","e","n","n","n","n"], ans: 'e' },
];

tests.forEach(test => {
    let res = findMin(test.nums);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
