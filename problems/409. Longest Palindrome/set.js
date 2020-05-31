/*
Iterate through the inputs, adding and deleting items from a set
When you find an item for the first time, add it to set
When you find it a second time, delete from set and add 2 to palindrome length

If you have any items left in set after you're done, add 1 to palindrome (middle character)

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {number}
 */
let longestPalindrome = function(s) {
    const set = new Set();
    let pairs = 0;
    for (let char of s) {
        if (set.has(char)) {
            pairs += 2;
            set.delete(char);
        } else {
            set.add(char);
        }
    }
    return pairs + (set.size > 0 ? 1 : 0);
};

let tests = [
    {params: ['abccccdd'], ans: 7},
    {params: ['bb'], ans: 2},
];

tests.forEach(test => {
    let res = longestPalindrome(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
