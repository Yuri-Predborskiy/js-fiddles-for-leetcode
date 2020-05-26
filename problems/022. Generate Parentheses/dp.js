/*
Given a number n, generate all combinations of properly opened and closed parentheses combinations
Same as permutations of a string, except parentheses should be closed after being opened,
    and should be opened before they are closed

Solution using DP - break the problem into smaller parts and solve each one separately, then combine solutions

Time complexity: O(2^2n)
Space complexity: O(2^2n)
 */

const {compareArrays} = require('../helper');

/**
 * @param {number} n
 * @return {string[]}
 */
let generateParenthesis = function(n) {
    const results = [];
    if (n < 1) {
        return results;
    }

    const stack = [[['('], 1, 0]];
    while (stack.length > 0) {
        const [combination, open, closed] = stack.pop();
        if (combination.length === n * 2) {
            results.push(combination.join(''));
            continue;
        }
        if (closed < open) {
            const combo = combination.slice();
            combo.push(')');
            stack.push([combo, open, closed + 1]);
        }
        if (open < n) {
            combination.push('(');
            stack.push([combination, open + 1, closed]);
        }
    }

    return results;
};

let tests = [
    {params: [1], ans: ['()']},
    {params: [2], ans: ['()()', '(())']},
    {params: [3], ans: ['((()))','(()())','(())()','()(())','()()()']},
];

tests.forEach(test => {
    let res = generateParenthesis(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
