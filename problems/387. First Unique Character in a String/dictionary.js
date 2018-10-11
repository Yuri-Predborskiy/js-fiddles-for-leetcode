/**
 * @param {string} s
 * @return {number}
 */
let firstUniqChar = function(s) {
    let dict = {};
    for (let i = 0; i < s.length; i++) {
        dict[s[i]] = dict[s[i]] + 1 || 1;
    }
    for (let i = 0; i < s.length; i++) {
        if (dict[s[i]] === 1) {
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
