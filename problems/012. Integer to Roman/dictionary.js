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
 * @param {number} num
 * @return {string}
 */
let intToRoman = function(num) {
    const dictionary = [
        1000, 'M',
        900, 'CM',
        500, 'D',
        400, 'CD',
        100, 'C',
        90, 'XC',
        50, 'L',
        40, 'XL',
        10, 'X',
        9, 'IX',
        5, 'V',
        4, 'IV',
        1, 'I'
    ];

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
    {params: [3], ans: 'III'},
    {params: [4], ans: 'IV'},
    {params: [9], ans: 'IX'},
    {params: [58], ans: 'LVIII'},
    {params: [1994], ans: 'MCMXCIV'},
];

tests.forEach(test => {
    let res = intToRoman(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
