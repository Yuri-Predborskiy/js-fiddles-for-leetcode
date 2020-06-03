/*
Every number on the phone keyboard represents several letters
Write down all possible combinations of letters based on pressed numbers

Pre-define dictionary. Transform every number into all possible letters
Repeat for previous results
Replace results with new combinations

Time complexity: O(4^n) worst case if all digits have 4 letters, n - number of digits
Space complexity: O(4^n)
 */

const {compareArrays} = require('../helper');

/**
 * @param {string} digits
 * @return {string[]}
 */
let letterCombinations = function(digits) {
    function getCombinations(results, index) {
        if (index === digits.length) {
            return results;
        }
        let newResults = [];
        let lettersArray = dictionary[digits[index]];
        for (let letter of lettersArray) {
            newResults.push(...results.map(res => res + letter));
        }
        return getCombinations(newResults, index + 1);
    }

    if (!digits) {
        return [];
    }

    const dictionary = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z'],
    };

    return getCombinations([''], 0);
};

let tests = [
    {params: ['2'], ans: ["a", "b", "c"]},
    {params: ['23'], ans: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]},
];

tests.forEach(test => {
    let res = letterCombinations(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
