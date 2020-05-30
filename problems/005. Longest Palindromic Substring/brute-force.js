/*
Find longest palindromic substring
Not permutation, just substring
For every start, compare element before and after and add them to palindrome if they are identical

Time complexity: O(n^2)
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
let longestPalindrome = function(s) {
    if (s < 2) {
        return s;
    }
    let pal = '', maxPal = '';
    // longest palindrome with 1-char core
    for (let start = 0; start < s.length; start++) {
        if (pal.length > maxPal.length) {
            maxPal = pal;
        }
        pal = s[start];
        for (let shift = 1; start + shift < s.length && start - shift >= 0; shift++) {
            if (s[start + shift] === s[start - shift]) {
                pal = s[start - shift] + pal + s[start + shift];
            } else {
                break;
            }
        }
    }
    // longest palindrome with 2-char core
    for (let start = 0; start < s.length; start++) {
        if (pal.length > maxPal.length) {
            maxPal = pal;
        }
        if (s[start] !== s[start + 1]) {
            continue;
        }
        pal = s[start] + s[start + 1];
        for (let shift = 1; start + shift + 1 < s.length && start - shift >= 0; shift++) {
            if (s[start + shift + 1] === s[start - shift]) {
                pal = s[start - shift] + pal + s[start + shift + 1];
            } else {
                break;
            }
        }
    }
    return maxPal;
};

function log(...rest) {
    if (!logEnabled) return;
    console.log(rest.join(' '));
}

let logEnabled = false;
let tests = [
    { params: ['babad'], ans: 'bab' },
    { params: ['cbbd'], ans: 'bb' },
    { params: ['cbabd'], ans: 'bab' },
    { params: ['cbaabd'], ans: 'baab' },
];

for (let test of tests) {
    let res = longestPalindrome(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
}
