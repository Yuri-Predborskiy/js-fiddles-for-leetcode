/*
Naive algorithm, no bit shifts, no subtraction, simple modulo
Calculate all simplified fractions up to a max denominator
Calculation is done via trying to divide both number and denominator by every number till N

Time complexity: O(n^3), not precise. For every denominator from 2 to N, for every number from 1 to denominator
    try to find common divisor. If it exists, skip this number.
Space complexity: O(1) constant extra memory outside of saving output for result
 */

/**
 * @param {number} n
 * @return {string[]}
 */
let simplifiedFractions = function(n) {
    function isSimple(number, denominator) {
        if (number === 1) {
            return true;
        }
        let test = 2;
        while (test < number) {
            if (number % test === 0 && number % test === denominator % test) {
                return false;
            }
            test++;
        }
        return number < denominator && denominator % number !== 0;
    }

    if (n <= 1) {
        return [];
    }
    const result = [];
    for (let denominator = 2; denominator <= n; denominator++) {
        for (let number = 1; number < n; number++) {
            if (isSimple(number, denominator)) {
                result.push(`${number}/${denominator}`);
            }
        }
    }
    return result;
};

let tests = [
    {params: [1], ans: []},
    {params: [2], ans: ['1/2']},
    {params: [3], ans: ['1/2','1/3','2/3']},
    {params: [4], ans: ['1/2','1/3','1/4','2/3','3/4']},
    {params: [5], ans: ['1/2','1/3','1/4','1/5','2/3','2/5','3/4','3/5','4/5']},
    {params: [6], ans: ['1/2','1/3','1/4','1/5','1/6','2/3','2/5','3/4','3/5','4/5','5/6']},
];

tests.forEach(test => {
    let res = simplifiedFractions(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});