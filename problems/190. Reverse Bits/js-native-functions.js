/*
Given an integer, convert it to its binary representation, reverse all bits, and return integer from bits

Solution using javascript built-in functions for reversing a string and adding padding on the left (zero bits)
First, convert number into binary.
Then add zero-padding on the left to make it a 32-bit binary
Then split string into array, reverse array and join it back
Then convert it back into a number and return

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
let reverseBits = function(n) {
    let bits = n.toString(2).padStart(32, '0');
    bits = bits.split('').reverse().join('');
    return parseInt(bits, 2);
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
