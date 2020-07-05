/*
Check if number is ugly number

DP solution
Calculate all ugly numbers up to num
Compare input with last ugly number and return the result

Solution inspired by next problem's solution (Ugly number II)
This solution can be optimized - we can skip calculating every ugly number

Time complexity: O(n)
Space complexity: O(n) since we store all numbers up to n
 */

/**
 * @param {number} num
 * @return {boolean}
 */
let isUgly = function(num) {
    function calcNum(index, factor) {
        return nums[index] * factor;
    }
    if (num === 1) {
        return true;
    }
    if (num <= 0) {
        return false;
    }

    const nums = [1];
    let index2 = 0;
    let index3 = 0;
    let index5 = 0;
    let val2 = calcNum(index2, 2);
    let val3 = calcNum(index3, 3);
    let val5 = calcNum(index5, 5);
    while (nums[nums.length - 1] < num) {
        let min = Math.min(val2, val3, val5);
        nums.push(min);
        if (val2 === min) {
            val2 = calcNum(++index2, 2);
        }
        if (val3 === min) {
            val3 = calcNum(++index3, 3);
        }
        if (val5 === min) {
            val5 = calcNum(++index5, 5);
        }
    }
    return nums[nums.length - 1] === num;
};

let tests = [
    {params: [1], ans: true},
    {params: [2], ans: true},
    {params: [3], ans: true},
    {params: [5], ans: true},
    {params: [8], ans: true},
    {params: [14], ans: false},
    {params: [0], ans: false},
    {params: [-1], ans: false},
];

tests.forEach(test => {
    let res = isUgly(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
