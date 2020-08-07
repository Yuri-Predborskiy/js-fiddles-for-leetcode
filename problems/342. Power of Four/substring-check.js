/*
Check if number is a power of 4

Solution using substring check
First, convert number to binary
Then, create a substring of the binary (skip first number)
This substring should be all 0s, and its length should be divisible by 2 without remainder
Edge cases: any negative numbers, 0 itself and 1 (which is 4 to the power of 0)

Time complexity: O(1), O(n) if you count substring, where n is binary length of the input number
Space complexity: O(1)
*/

/**
 * @param {number} num
 * @return {boolean}
 */
let isPowerOfFour = function(num) {
    if (num <= 0) {
        return false;
    }
    if (num === 1) {
        return true;
    }
    const binary = num.toString(2);
    const zeroes = binary.substring(1);
    return parseInt(zeroes, 2) === 0 && zeroes.length % 2 === 0;
};

let tests = [
    {params: [16], ans: true},
    {params: [64], ans: true},
    {params: [1], ans: true},
    {params: [0], ans: false},
    {params: [-4], ans: false},
    {params: [5], ans: false},
    {params: [32], ans: false},
    {params: [18], ans: false},
    {params: [20], ans: false},
    {params: [24], ans: false},
    {params: [8], ans: false},
];

tests.forEach(test => {
    let res = isPowerOfFour(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
