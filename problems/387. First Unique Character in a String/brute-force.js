/*
Brute force solution - check if any string is found outside of the place where it is found
Repeat for each letter in the inputs
Slow but cheap

Time complexity: O(n^2)
Space complexity: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
let firstUniqChar = function(s) {
    for (let i = 0; i < s.length; i++) {
        let found = false;
        for (let j = 0; j < s.length; j++) {
            if (i === j) {
                continue;
            }
            if (s[i] === s[j]) {
                found = true;
                break;
            }
        }
        if (!found) {
            return i;
        }
    }
    return -1;
};

let tests = [
    { s1: 'leetcode', ans: 0 },
    { s1: 'loveleetcode', ans: 2 },
    { s1: 'ooo', ans: -1 },
];

tests.forEach(test => {
    let res = firstUniqChar(test.s1);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
