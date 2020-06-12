/*
Brain teaser (trick) solution, inspired by other solutions
Every power of two is a 1, followed by 0s (1 = 1, 10 = 2, 100 = 4, 1000 = 8...)
    fun fact: number of 0s is the power of 2 itself
Every power of 2 minus one would be all 1s, except the first bit, which will become 0
If you & (and) the two numbers, you get all 0s
10000 - 1 = 01111
10000 & 01111 = 0

The only other check that needs to be made is that n is > 0

Time complexity: O(log(n))
Space complexity: O(1)
 */

/**
 * @param {number} n
 * @return {boolean}
 */
let isPowerOfTwo = function(n) {
    return n > 0 && (n & (n-1)) === 0;
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
