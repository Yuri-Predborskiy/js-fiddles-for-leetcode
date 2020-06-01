/*
Write a function to check if number is palindrome
Convert to string and read one digit at a time from both ends, if they are different - return false
If no differences found - return true

Time complexity: O(n) where n - number of digits in the number
Space complexity: O(n)
 */

/**
 * @param {number} x
 * @return {boolean}
 */
let isPalindrome = function(x) {
    if (x < 0) {
        return false;
    }
    let string = '' + x;
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== string[string.length - i - 1]) {
            return false;
        }
    }
    return true;
};

let tests = [
    {params: [121], ans: true},
    {params: [-1], ans: false},
    {params: [10], ans: false},
];

tests.forEach(test => {
    let res = isPalindrome(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
