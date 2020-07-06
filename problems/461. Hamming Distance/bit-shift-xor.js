/*
Calculate number of bits that differ

XOR + bit shift solution
Calculate XOR of the two numbers
Perform bitwise AND on XOR and 1 (check if last bit is 1). If result is 1, increment count
Shift XOR by 1 bit to the left (delete checked bit)
Repeat till XOR is 0 (shift all bits to the left)

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
let hammingDistance = function(x, y) {
    if (x === y) {
        return 0;
    }
    let xor = (x ^ y);
    let count = 0;
    while (xor > 0) {
        count += xor & 1;
        xor = xor >> 1;
    }
    return count;
};

let tests = [
    {params: [1, 4], ans: 2},
    {params: [4, 14], ans: 2},
];

tests.forEach(test => {
    let res = hammingDistance(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
