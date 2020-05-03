/*
Check if it is possible to build first string using characters in the second string
Optimization - collect required letters (and their number) first
Then check if magazine string includes all those characters in required numbers
This way we only check second string as long as we still need any characters (early exit strategy)
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

    let dict = {}, count = 0;
    for (let letter of ransomNote) {
        dict[letter] = (dict[letter] || 0) + 1;
        count++;
    }

    for (let letter of magazine) {
        if (dict[letter]) {
            dict[letter]--;
            count--;
        }
        if (count === 0) {
            break;
        }
    }
    return count === 0;
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
