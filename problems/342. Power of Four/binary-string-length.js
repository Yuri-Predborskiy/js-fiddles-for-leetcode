/*
Check if number is a power of 4

Solution using binary representation of a number
First, num - 1 [binary AND] num should be 0 (it is a power of two)
Second, check if binary.length-1 is divisible by 2 without remainder
    4 to any power (other than 0) is 1 followed by a pair number of 0s, 4 = 100, 16 = 10000...

Time complexity: O(1)
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
    return (binary.length - 1) % 2 === 0 && ((num - 1) & num) === 0;
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
