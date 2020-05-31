/*
Given a binary string s and an integer k.
Return True if all binary codes of length k is a substring of s. Otherwise, return False.

Brain teaser question, optimal solution requires prior knowledge.
Knowledge required: number of solutions is 2^k. Exactly that amount, no two ways about it.

Optimized solution:
Check if string contains 2^k unique substrings of length k
Use a Set to store unique variants since set will throw away existing variants for you.
Return true once set size is 2^k
Return false if you reached the end of the string and did not find enough unique substrings of length k.

Solution algorithm is "sliding window" - check a substring of a certain length inside string and move indexes forward
Optimizations:
add to set without checking if item already exists (set ignores duplicates)
pre-compute target count of results and exit as soon as count is reached (no need to continue once count is reached)
If count is reached, you will not reach the end of the loop, so if you reached the end of the loop, simply return false

Time complexity: O(n)
Space complexity: O(2^k)

-----------------------------------------------
            Alternative solutions
-----------------------------------------------
Alternative solutions require calculating all possible variants of k-long 0 and 1 combinations
    and then checking if the input string contains them all.

Brute force solution:
pre-compute all possible string combinations, like
01, 11, 10, 00
Add them to hash table (map), where key is combination, value is "found or not" boolean
Scan the input string, marking found results. At the end, check if all combinations were found.
Alternatively, add them to a set and delete from set if they are found.
Return true if set is empty.

Benefits: does not require prior knowledge
Drawbacks: slower to write and cannot be optimized

Naive solution:
Try to find every possible combination of bits of length k in the string, one combination at a time
Scan input to see if you can find this specific substring in the string using sliding window technique
Or just use string.includes(substring) where JS engine does the heavy lifting for you (time complexity is the same)
Time complexity: O(n*2^k)
Space complexity: O(1)
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
let hasAllCodes = function(s, k) {
    const set = new Set();
    const targetSize = Math.pow(2, k);
    for (let i = k; i <= s.length; i++) {
        set.add(s.substring(i - k, i));
        if (set.size === targetSize) {
            return true;
        }
    }
    return false;
};

const tests = [
    {params: ['00110110', 2], ans: true},
    {params: ['00110', 2], ans: true},
    {params: ['0110', 1], ans: true},
    {params: ['0110', 2], ans: false},
    {params: ['0000000001011100', 4], ans: false},
];

for (let test of tests) {
    const res = hasAllCodes(...test.params);
    const correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
}
