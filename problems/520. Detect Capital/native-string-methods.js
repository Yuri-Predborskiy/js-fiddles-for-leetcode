/*
Find biggest area given an array of vertical lines.
Area = (right line index - left line index) * (height of the shorter vertical line)
Use sliding window technique. Starting window is entire array.
Move the smaller line to the next index (left goes forward, right goes backward).
Keep track of biggest area.
Stop when indexes meet.

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {string} word
 * @return {boolean}
 */
let detectCapitalUse = function(word) {
    if (word === word.toUpperCase()) {
        return true;
    }
    const wordWithoutFirstChar = word.substring(1);
    return wordWithoutFirstChar === wordWithoutFirstChar.toLowerCase();
};

let tests = [
    {params: ['USA'], ans: true},
    {params: ['Webstorm'], ans: true},
    {params: ['javascript'], ans: true},
    {params: ['I'], ans: true},
    {params: ['j'], ans: true},
    {params: [''], ans: true},
    {params: ['FlaG'], ans: false},
    {params: ['LeetCode'], ans: false},
    {params: ['fooBar'], ans: false},
    {params: ['barN'], ans: false},
];

tests.forEach(test => {
    let res = detectCapitalUse(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
