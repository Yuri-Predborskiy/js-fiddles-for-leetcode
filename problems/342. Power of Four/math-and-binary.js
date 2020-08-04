/*
Check if number is a power of 4

Solution using pure binary logic
Any power of 4 minus one is divisible by 3 ((1 - 1) % 3 = 0, (4 - 1) % 3 = 0, (16 - 1) % 3 = 0)
Plus it is also a power of 2
And it is more than 0 (negative numbers cannot be power of positive 4)

Time complexity: O(1)
Space complexity: O(1)
Solution inspired by the following discussion:
https://leetcode.com/problems/power-of-four/discuss/80448/Simple-C++-O(1)-solution-without-0x55555555
*/


/**
 * @param {number} num
 * @return {boolean}
 */
let isPowerOfFour = function(num) {
    return (num > 0) && ((num - 1) & num) === 0 && (num - 1) % 3 === 0;
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
