/*
Reverse string in place. String is provided as an array. Method should not return anything.
Space complexity should be O(1) - do not allocate another array
Can be done using two pointers and a temporary value. Swap values using temp value, repeat till middle of the array

Time complexity: O(n)
Space complexity: O(1)
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {string[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
let reverseString = function(s) {
    let len = s.length - 1;
    for (let i = 0; i < Math.floor(s.length / 2); i++) {
        let temp = s[i];
        s[i] = s[len - i];
        s[len - i] = temp;
    }
};

let tests = [
    {params: [["h","e","l","l","o"]], ans: ["o","l","l","e","h"]},
    {params: [["H","a","n","n","a","h"]], ans: ["h","a","n","n","a","H"]},
];

tests.forEach(test => {
    // reverse string in place, without using extra memory - modify input, return void
    reverseString(...test.params);
    // to get result check inputs
    let res = test.params[0];
    let correct = compareArraysStrict(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
