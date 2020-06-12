/*
Divide by 2 till number is 1
Keep track of number of divisions
If at any point modulo of n / 2 is not 0, return false (all powers of 2 are divisible by 2)
If we end up with an even power, it should not be negative, as negative number upped to even power is positive

Time complexity: O(log(n))
Space complexity: O(1)
 */

/**
 * @param {number} n
 * @return {boolean}
 */
let isPowerOfTwo = function(n) {
    if (n <= 0) {
        return false;
    }

    while (n > 1) {
        if (n % 2 !== 0) {
            return false;
        }
        n /= 2;
    }
    return true;
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
