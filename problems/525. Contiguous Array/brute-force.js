/*
Brute force solution
Starting at each index, find index where the number of 0s and 1s are the same
    by counting numbers from the start till the end
Time complexity: we do O(n) calculations for each of the O(n) inputs
total: O(n^2)

LeetCode: Time limit exceeded, solution not accepted. Fails at the big test case (50k inputs)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let findMaxLength = function(nums) {
    let max = 0;
    for (let left = 0; left < nums.length; left++) {
        let zeros = 0, ones = 0, maxCont = 0;
        for (let right = left; right < nums.length; right++) {
            if (nums[right] === 0) {
                zeros++;
            }
            if (nums[right] === 1) {
                ones++;
            }
            if (zeros === ones) {
                maxCont = right - left + 1;
                if (maxCont > max) {
                    max = maxCont;
                }
            }
        }
    }

    return max;
};

let tests = [
    {
        params: [[0,1]],
        ans: 2,
    },
    {
        params: [[0,1,0]],
        ans: 2,
    },
    {
        params: [[0,0,0,1,1,1,0]],
        ans: 6,
    },
];

tests.forEach(test => {
    let res = findMaxLength(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
