/*
Brain teaser (trick) solution, inspired by other solutions
n is power of two if max value (which is a power of 2) can be divided by n without remainder (modulo)

Time complexity: O(log(n))
Space complexity: O(1)
 */

/**
 * @param {number} n
 * @return {boolean}
 */
let isPowerOfTwo = function(n) {
    if (n < 1) {
        return false;
    }
    return Number.MAX_VALUE % n === 0;
};

let tests = [
    {params: [0], ans: false},
    {params: [1], ans: true},
    {params: [2], ans: true},
    {params: [16], ans: true},
    {params: [-16], ans: false},
    {params: [218], ans: false},
    {params: [1073741825], ans: false},
];

tests.forEach(test => {
    let res = isPowerOfTwo(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
