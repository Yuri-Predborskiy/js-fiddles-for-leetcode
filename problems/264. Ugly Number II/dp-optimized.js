/*
Calculate n-th ugly number

DP solution - calculate all ugly numbers up to n, return n-th number
Calculations are performed in a manner similar to calculating fibonacci numbers
We calculate the next ugly number as a base ugly number multiplied by all allowed prime factors
    but only keep the smallest of them
We then update pointers for all prime factors that match current ugly number
Optimizations:
- 10 pre-calculated numbers
- keeping previous calculations in memory till they are used (reduce recalculations)

Time complexity: O(n)
Space complexity: O(n) since we store all numbers up to n
 */

/**
 * @param {number} n
 * @return {number}
 */
let nthUglyNumber = function(n) {
    const nums = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12];
    if (n - 1 < nums.length) {
        return nums[n - 1];
    }

    let index2 = 6;
    let index3 = 4;
    let index5 = 2;
    let val2 = nums[index2] * 2;
    let val3 = nums[index3] * 3;
    let val5 = nums[index5] * 5;
    for (let i = nums.length; i < n; i++) {
        let next = Math.min(val2, val3, val5);
        nums[i] = next;
        if (val2 === next) {
            index2++;
            val2 = nums[index2] * 2;
        }
        if (val3 === next) {
            index3++;
            val3 = nums[index3] * 3;
        }
        if (val5 === next) {
            index5++;
            val5 = nums[index5] * 5;
        }
    }
    return nums[n - 1];
};

let tests = [
    {params: [10], ans: 12},
    {params: [1], ans: 1},
    {params: [574], ans: 1953125},
    {params: [1690], ans: 2123366400},
];

tests.forEach(test => {
    let res = nthUglyNumber(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
