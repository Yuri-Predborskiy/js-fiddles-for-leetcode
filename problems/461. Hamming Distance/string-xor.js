/*
Calculate number of bits that differ

String + XOR solution
Calculate a XOR of two numbers (it will have "1" bit only when one of the two compared bits is 1
Count the number of 1s

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
    const xor = (x ^ y).toString(2);
    let count = 0;
    for (let bit of xor) {
        if (bit === '1') {
            count++;
        }
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
