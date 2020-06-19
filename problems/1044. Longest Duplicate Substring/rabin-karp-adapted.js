/*
Current solution is based on a solution posted in LeetCode discussions:
https://leetcode.com/problems/longest-duplicate-substring/discuss/498238/javascript-solution

It uses Rabin-Karp's algorithm for string pattern matching
https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm

It also uses binary search to find length of duplicates
 */

/**
 * @param {string} S
 * @return {string}
 */
let longestDupSubstring = function(S) {
    function findRepeatingSubstringStartIndex(charCodeArray, limit) {
        let hash = createHash(charCodeArray, 0, limit);
        const set = new Set([hash]);
        const power = pow(base, limit, maxInt);
        for (let i = 1; i <= charCodeArray.length - limit; i++) {
            hash = ((hash * base - ((charCodeArray[i - 1] * power) % maxInt) + maxInt) % maxInt) + (charCodeArray[i + limit - 1] % maxInt);
            if (set.has(hash)) {
                return i;
            }
            set.add(hash);
        }
        return -1;
    }

    function createHash(arr, start, end) {
        let hash = 0;
        for (let i = start; i < end; i++) {
            hash = (base * hash + arr[i]) % maxInt;
        }
        return hash;
    }

    function pow(b, exp, mod) {
        let output = 1;
        for (let i = 0; i < exp; i++) {
            output = (output * b) % mod;
        }
        return output;
    }

    const base = 26;
    const maxInt = 2 ** 32;
    const firstCharCode = 'a'.charCodeAt(0);
    const charCodeArray = S.split('').map((char) => char.charCodeAt(0) - firstCharCode);
    let left = 0;
    let right = S.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (findRepeatingSubstringStartIndex(charCodeArray, mid) >= 0) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    const length = left - 1;
    const index = findRepeatingSubstringStartIndex(charCodeArray, length);
    return index >= 0 ? S.substring(index, index + length) : '';
};

let tests = [
    {params: ['banana'], ans: 'ana'},
    {params: ['abcd'], ans: ''},
];

tests.forEach(test => {
    let res = longestDupSubstring(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
