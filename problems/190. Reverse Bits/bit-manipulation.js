/*
Given an integer, convert it to its binary representation, reverse all bits, and return integer from bits

Solution using bit manipulation
Perform the following operation 32 times:
    - multiply result by 2 (shift bits of result by one position to the left)
    - add next bit from n (n & 1)
    - shift 1 one bit to the right (throw away bit we've processed)
32 times because it signifies 32 bits of the input, including leading zero bits
We basically rebuild the integer using its bit representation in reverse, one bit at a time

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
let reverseBits = function(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result *= 2;
        result += n & 1;
        n = n >> 1;
    }
    return result;
};

let tests = [
    {params: [43261596], ans: 964176192},
    {params: [4294967293], ans: 3221225471},
];

tests.forEach(test => {
    let res = reverseBits(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
