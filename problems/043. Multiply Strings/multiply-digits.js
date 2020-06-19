/*
Multiply numbers presented as strings without using BigInt library and without parsing numbers directly

Solution is to multiply one digit of each number at a time and save it into the result table.
Since each table cell can only contain one digit, anything bigger than 9 is broken into cell value (modulo of 10)
    and remainder. Remainder is carried over into the next calculation.
At the end of calculations (one digit in num2 multiplied by all digits in num1) save remainder into the next cell
Update index every time you multiply all digits of num1 with one digit of num2 - add num2 length - 1
Meaning, starting shift for addition of the next row of number is shifted by 1 for every next number
This is how I was taught multiplication in school - without using a calculator

Time complexity: O(nm) = O(n^2) when n = m; n, m - lengths of input strings
Space complexity: O(n + m)
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
let multiply = function(num1, num2) {
    if (num1 === '0' || num2 === '0') {
        return '0';
    }
    let remainder = 0;
    let index = num1.length + num2.length - 1;
    const result = new Array(index + 1);
    for (let i = num1.length - 1; i >= 0; i--, index += num2.length - 1) {
        for (let j = num2.length - 1; j >= 0; j--, index--) {
            const calc = num1[i] * num2[j] + remainder + (result[index] || 0);
            result[index] = calc % 10;
            remainder = (calc - result[index]) / 10;
        }
        if (remainder > 0) {
            result[index] = (result[index] || 0) + remainder;
            remainder = 0;
        }
    }
    return result.join('');
};

let tests = [
    {params: ['98', '9'], ans: '882'},
    {params: ['9', '98'], ans: '882'},
    {params: ['123', '456'], ans: '56088'},
    {params: ['2', '3'], ans: '6'},
    {params: ['999', '999'], ans: '998001'},
    {params: ['0', '1123'], ans: '0'},
    {params: ['1123', '0'], ans: '0'},
];

tests.forEach(test => {
    let res = multiply(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
