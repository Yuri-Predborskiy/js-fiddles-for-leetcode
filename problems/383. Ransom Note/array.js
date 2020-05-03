/*
Check if it is possible to build first string using characters in the second string
Complicated approach
Use charCodeAt instead of comparing strings
Use array index for each letter instead of using a map
 */

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
let canConstruct = function(ransomNote, magazine) {
    if (ransomNote.length > magazine.length) {
        return false;
    }

    const dict = new Int8Array(26).fill(0);
    let total = 0;
    for (let i = 0; i < ransomNote.length; i++) {
        dict[ransomNote.charCodeAt(i) - 97]++;
        total++;
    }

    for (let i = 0; i < magazine.length; i++) {
        if (dict[magazine.charCodeAt(i) - 97]) {
            dict[magazine.charCodeAt(i) - 97]--;
            total--;
        }
        if (total === 0) {
            break;
        }
    }
    return total === 0;
};

let tests = [
    {
        params: ['a', 'b'],
        ans: false,
    },
    {
        params: ['aa', 'ab'],
        ans: false,
    },
    {
        params: ['aa', 'aab'],
        ans: true,
    },
    {
        params: ['', 'aab'],
        ans: true,
    },
    {
        params: ['a', ''],
        ans: false,
    },
    {
        params: ['', ''],
        ans: true,
    },
];

tests.forEach(test => {
    let res = canConstruct(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
