/*
Find longest palindromic substring
Not permutation, just substring
Optimized algorithm. Instead of doing two checks in a row for single or double cores, simply expand the center of
    palindrome boundaries for as long as strings are the same as first string
Update starting index to be the next index after the end of "core" palindrome
Then perform check if string on the left is identical to string on the right and expand boundaries
If boundaries create a larger length than max known boundaries, update max
Return substring of input using "max" boundaries

Solution inspired by fastest runtime.

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

    let maxLeft = 0, maxRight = 0;
    let startIndex = 0;
    while (startIndex < s.length) {
        let left = startIndex, right = startIndex;

        while (s[right] === s[right + 1]) { // duplicates - push right boundary
            right++;
        }
        startIndex = right + 1;

        while (left > 0 && right < s.length - 1 && s[left - 1] === s[right + 1]) { // palindrome string, expand boundary
            left--;
            right++;
        }

        if (right - left > maxRight - maxLeft) {
            maxLeft = left;
            maxRight = right;
        }
    }

    return s.substring(maxLeft, maxRight + 1);
};

function log(...rest) {
    if (!logEnabled) return;
    console.log(rest.join(' '));
}

let logEnabled = false;
let tests = [
    { params: ['bananas'], ans: 'anana' },
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
