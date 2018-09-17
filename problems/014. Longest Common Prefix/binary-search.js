/**
 * @param {string[]} strs
 * @return {string}
 */
let longestCommonPrefix = function(strs) {
    function isCommonWord(word, start) {
        for (let i = 1; i < strs.length; i++) {
            let str = strs[i];
            for (let j = 0; j < word.length; j++) {
                if (str[start + j] !== word[j]) {
                    return false;
                }
            }
        }
        return true;
    }
    if (strs.length === 0) {
        return '';
    }
    if (strs.length === 1) {
        return strs[0];
    }

    let len = Infinity;
    strs.forEach(str => { len = Math.min(len, str.length); });

    let left = 0, right = len, mid = 0, start = 0, prefix = '';
    while (left < right) {
        mid = Math.floor((left + right) / 2);
        let word = strs[0].substring(start, mid);
        if (isCommonWord(word, start)) {
            start = mid;
            left = mid + 1;
            prefix += word;
        } else {
            right = mid;
        }
    }
    let word = strs[0].substring(start, left);
    if (isCommonWord(word, start)) {
        prefix += word;
    }
    return prefix;
};

let tests = [
    { strings: ['google','googlegoogle','googlegooglegoogle'], ans: 'google' },
    { strings: ['google','googolgoogle','googlegooglegoogle'], ans: 'goog' },
    { strings: ['flower','flow','flight'], ans: 'fl' },
    { strings: ['dog','racecar','car'], ans: '' },
];

tests.forEach(test => {
    let res = longestCommonPrefix(test.strings);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
