/*
Convert Roman number to integer
Use pre-defined dictionary and scan next two letters.
If this combination exists (4, 9, 40, 90, 400, 900), add respective number to result number.
If no such combination exists, simply use current item. It should exist in dictionary.

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
