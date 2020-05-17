/*
Use sliding window technique

Time complexity: O(n)
Space complexity: O(1) (constant)
 */

const {compareArrays} = require('../helper');

/**
 * @param {string} string
 * @param {string} subString
 * @return {number[]}
 */
let findAnagrams = function(string, subString) {
    function arraysAreEqual(left, right) {
        for (let i = 0; i < left.length; i++) {
            if (left[i] !== right[i]) {
                return false;
            }
        }
        return true;
    }
    const results = [];
    const stringCharSet = new Array(26).fill(0);
    const subStringCharSet = new Array(26).fill(0);
    const letterStart = 'a'.charCodeAt(0);
    for (let i = 0; i < subString.length; i++) {
        stringCharSet[string.charCodeAt(i) - letterStart]++;
        subStringCharSet[subString.charCodeAt(i) - letterStart]++;
    }

    for (let i = subString.length; i <= string.length; i++) {
        if (arraysAreEqual(stringCharSet, subStringCharSet)) {
            results.push(i - subString.length);
        }
        stringCharSet[string.charCodeAt(i - subString.length) - letterStart]--;
        stringCharSet[string.charCodeAt(i) - letterStart]++;
    }
    return results;
};

let tests = [
    {params: ['cbaebabacd', 'f'], ans: []},
    {params: ['cbaebabacd', 'abc'], ans: [0, 6]},
    {params: ['abab', 'ab'], ans: [0, 1, 2]},
];

tests.forEach(test => {
    let res = findAnagrams(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
