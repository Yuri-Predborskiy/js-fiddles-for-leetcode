// brute force. Time complexity - O(n^2)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
let subarraySum = function(nums, k) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            if (sum === k) {
                count++;
            }
        }
    }
    return count;
};

let tests = [
    {
        params: [[1,1,1], 2],
        ans: 2,
    },
];

tests.forEach(test => {
    let res = subarraySum(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
