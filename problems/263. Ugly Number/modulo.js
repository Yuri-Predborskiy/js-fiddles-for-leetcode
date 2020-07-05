/*
Check if number is ugly number

Modulo solution
Delete number by prime factors (2, 3, 5) as long as possible, then check if resulting number is 1
If result is one, it is an ugly number

Solution inspired by other solutions

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {number} num
 * @return {boolean}
 */
let isUgly = function(num) {
    if (num <= 0) {
        return false;
    }
    const factors = [2, 3, 5];
    for (let factor of factors) {
        while (num % factor === 0) {
            num /= factor;
        }
    }
    return num === 1;
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
