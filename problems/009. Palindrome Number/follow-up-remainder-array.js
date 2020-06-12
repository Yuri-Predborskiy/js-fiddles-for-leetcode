/*
Write a function to check if number is palindrome
Follow-up - do not convert number to string

Instead of turning number into string and reading string from both ends, we build an array of digits and read it
For each digit, we save remainder of input divided by 10 and update input to be 1/10 without remainder
Then we read array from both ends and compare numbers (same as a string)

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
    const numbers = [];
    do {
        numbers.push(x % 10);
        x = Math.floor(x / 10);
    } while (x > 0);
    for (let i = 0; i < Math.floor(numbers.length / 2); i++) {
        if (numbers[i] !== numbers[numbers.length - i - 1]) {
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
