/*
Convert integer to Roman numbers
Create a dictionary of Roman numbers
Take num, if it is divisible by one of the numbers in the dictionary (starting from the biggest), add letter to result
    and decrease num respectively.
If num is too small compared to dictionary item, check next dictionary item (at index + 2).
Repeat till num reaches 0.

Solution using recursion instead of a loop.

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {number} num
 * @return {string}
 */
let intToRoman = function(num) {
    function calc(num, index, word) {
        if (num <= 0) {
            return word;
        }
        if (Math.floor(num / dictionary[index]) > 0) {
            word += dictionary[index + 1];
            num -= dictionary[index];
        } else {
            index += 2;
        }
        return calc(num, index, word);
    }

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

    return calc(num, 0, '');
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
