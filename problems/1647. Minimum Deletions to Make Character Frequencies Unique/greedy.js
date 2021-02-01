/*
Find frequencies of each char. For each repeating frequency find the closest smaller unused frequency
Add the difference between unused frequency and frequency of repeats of current character

Time complexity: O(n^2) worst case
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {number}
 */
let minDeletions = function(s) {
    let total = 0;
    const dict = {};
    for (let c of s) {
        dict[c] = (dict[c] || 0) + 1;
    }
    const taken = [];
    for (let number of Object.values(dict)) {
        if (!taken[number]) {
            taken[number] = true;
        } else {
            let i;
            for (i = number; i > 0; i--) {
                if (!taken[i]) {
                    taken[i] = true;
                    break;
                }
            }
            total += number - i;
        }
    }
    return total;
};

let tests = [
    {params: ["aab"], ans: 0},
    {params: ["aaabbbcc"], ans: 2},
    {params: ["ceabaacb"], ans: 2},
];

tests.forEach(test => {
    let res = minDeletions(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
