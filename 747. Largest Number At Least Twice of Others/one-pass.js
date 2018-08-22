/*
    One pass brute force - find largest and second largest element
    If Math.floor(largest) / 2 >= 2nd largest, return largest element index, otherwise return -1
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function(nums) {
    let max = {
        value: -Infinity,
        index: -1,
        next: -Infinity
    };
    nums.forEach((num, index) => {
        if (num > max.value) {
            max.next = max.value;
            max.value = num;
            max.index = index;
        } else if (num > max.next) {
            max.next = num;
        }
    });
    if (Math.floor(max.value / 2) >= max.next) return max.index;
    return -1;
};

let tests = [
    { nums: [3, 6, 1, 0] , ans: 1 },
    { nums: [1, 2, 3, 4], ans: -1 },
];

tests.forEach(test => {
    let res = dominantIndex(test.nums);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
