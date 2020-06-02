/*
Convert integer to Roman numbers
Create a dictionary of Roman numbers
Take num, if it is divisible by one of the numbers in the dictionary (starting from the biggest), add letter to result
    and decrease num respectively.
If num is too small compared to dictionary item, check next dictionary item.
Repeat till num reaches 0.

This takes care of repeating numerals.

Time complexity: O(n)
Space complexity: O(1)
 */


/**
 * @param {string} s
 * @return {number}
 */
let romanToInt = function(s) {
    const dictionary = {
        'M': 1000,
        'CM': 900,
        'D': 500,
        'CD': 400,
        'C': 100,
        'XC': 90,
        'L': 50,
        'XL': 40,
        'X': 10,
        'IX': 9,
        'V': 5,
        'IV': 4,
        'I': 1,
    };
    let index = 0;
    let num = 0;
    while (index < s.length) {
        let doubleString = s[index] + s[index + 1];
        if (dictionary[doubleString]) {
            num += dictionary[doubleString];
            index += 2;
        } else {
            num += dictionary[s[index]];
            index++;
        }
    }
    return num;
};
/**
 * @param {number} num
 * @return {string}
 */
let intToRoman = function(num) {


    let remainder = num;
    let result = '';
    let index = 0;
    while (remainder > 0) {
        if (Math.floor(remainder / dictionary[index]) > 0) {
            result += dictionary[index + 1];
            remainder -= dictionary[index];
        } else {
            index += 2;
        }
    }
    return result;
};

let tests = [
    {params: ['III'], ans: 3},
    {params: ['IV'], ans: 4},
    {params: ['IX'], ans: 9},
    {params: ['LVIII'], ans: 58},
    {params: ['MCMXCIV'], ans: 1994},
];

tests.forEach(test => {
    let res = romanToInt(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
