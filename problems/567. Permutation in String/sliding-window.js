/*
Use sliding window technique
compare frequency of each character of one array to frequency of each character in another array
arrays are pre-defined, size = 26 - for each lowercase English letter
If we find same letters in a sliding window (from pointer 1 to pointer 2) as in substring, they are permutations

Time complexity: O(n) - sliding over the bigger string once, plus some
Space complexity: O(1) (constant)
 */

/**
 * @param {string} subString
 * @param {string} string
 * @return {boolean}
 */
let checkInclusion = function(subString, string) {
    function arraysAreEqual(left, right) {
        for (let i = 0; i < left.length; i++) {
            if (left[i] !== right[i]) {
                return false;
            }
        }
        return true;
    }
    const stringCharSet = new Array(26).fill(0);
    const subStringCharSet = new Array(26).fill(0);
    const letterStart = 'a'.charCodeAt(0);
    for (let i = 0; i < subString.length; i++) {
        stringCharSet[string.charCodeAt(i) - letterStart]++;
        subStringCharSet[subString.charCodeAt(i) - letterStart]++;
    }

    for (let i = subString.length; i <= string.length; i++) {
        if (arraysAreEqual(stringCharSet, subStringCharSet)) {
            return true;
        }
        stringCharSet[string.charCodeAt(i - subString.length) - letterStart]--;
        stringCharSet[string.charCodeAt(i) - letterStart]++;
    }
    return false;
};

let tests = [
    {params: ['ab', 'eidbaooo'], ans: true},
    {params: ['a', 'ab'], ans: true},
    {params: ['ab', 'eidboaoo'], ans: false},
];

tests.forEach(test => {
    let res = checkInclusion(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
