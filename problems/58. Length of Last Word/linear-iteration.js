/*
Return the length of the last word. Word ends with end of string or white space character

Algorithm:
Skip any white space at the end and then simply count characters till you find a white space

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
let lengthOfLastWord = function(s) {
    let count = 0;
    let index = s.length - 1;
    while (s[index] === ' ') {
        index--;
    }
    for (let i = index; i >= 0; i--) {
        if (s[i] === ' ') {
            break;
        }
        count++;
    }
    return count;
};

let tests = [
    {params: ['Hello World'], ans: 5},
    {params: ['a '], ans: 1},
];

tests.forEach(test => {
    let res = lengthOfLastWord(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
