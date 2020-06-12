/*
Two pointers approach.
Try to find each character from s in t keeping order. When a match is found, move both pointers, otherwise move t ptr

Time complexity: O(n)
Space complexity: O(1)

--- Follow up algorithm ---
Question: if we had a lot of different s'es, how would we change the code
We can create a hash table of characters found in t
Each key connects to an array of indexes that store indexes of respective letter
We scan t once and then just check if all characters we have in s are present in t
For each letter take index that is larger than last index
This way we can check that both all letters are present and their order is valid
Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
let isSubsequence = function(s, t) {
    let left = 0, right = 0;
    while (left < s.length && right < t.length) {
        if (s[left] === t[right]) {
            left++;
        }
        right++;
    }
    return left === s.length;
};

let tests = [
    {params: ['abc', 'ahbgdc'], ans: true},
    {params: ['axc', 'ahbgdc'], ans: false},
];

tests.forEach(test => {
    let res = isSubsequence(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
