/*
This algorithm is similar to sliding window algorithm, but we keep last item in cache instead of keeping a 2nd index.

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
let maxPower = function(s) {
    let last = '';
    let count = 0;
    let max = 1;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === last) {
            count++;
            max = Math.max(count, max);
        } else {
            last = s[i];
            count = 1;
        }
    }
    return max;
};

let tests = [
    {params: ['leetcode'], ans: 2},
    {params: ['abbcccddddeeeeedcba'], ans: 5},
    {params: ['triplepillooooow'], ans: 5},
    {params: ['hooraaaaaaaaaaay'], ans: 11},
    {params: ['tourist'], ans: 1},
];

tests.forEach(test => {
    let res = maxPower(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});