/*
Check if it is possible to build first string using characters in the second string
Simple way - break second string into individual characters and store it in a map (key - char, value - number of repeats)
 */

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
let canConstruct = function(ransomNote, magazine) {
    let dict = {};
    for (let letter of magazine) {
        dict[letter] = (dict[letter] || 0) + 1;
    }

    for (let letter of ransomNote) {
        if (!dict[letter]) {
            return false;
        }
        dict[letter]--;
    }
    return true;
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
