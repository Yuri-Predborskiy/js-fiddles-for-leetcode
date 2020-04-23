/*
Input: s = "abcdefg", shift = [[1,1],[1,1],[0,2],[1,3]]
Output: "efgabcd"
Explanation:
[1,1] means shift to right by 1. "abcdefg" -> "gabcdef"
[1,1] means shift to right by 1. "gabcdef" -> "fgabcde"
[0,2] means shift to left by 2. "fgabcde" -> "abcdefg"
[1,3] means shift to right by 3. "abcdefg" -> "efgabcd"

basically this means "shift to the right by 3 symbols", so we can skip first 3 operations entirely

idea:
single pass, O(n) time complexity
step 1:
combine all operations (shift x symbols to the left = shift length - x to the right, or simply add a negative number)
 and make a single shift operation
divide shift by length and only keep remainder to skip any cycles

build the final string by starting at string[desired shift] and continue through the string till the end,
 then continue from the start till string[desired shift - 1]
return resulting string
 */

/**
 * @param {string} s
 * @param {number[][]} shift
 * @return {string}
 */
let stringShift = function(s, shift) {
    let amount = 0, result = [];
    while (shift.length) {
        // treat shift as a stack
        let sh = shift.pop();
        let k = sh[0] === 1 ? 1 : -1;
        amount += sh[1] * k;
    }
    amount = amount % s.length;
    if (amount === 0) {
        return s;
    }
    if (amount < 0) {
        amount += s.length;
    }

    for (let i = 0; i < s.length; i++) {
        let index = (s.length - amount + i) % s.length;
        result.push(s[index]);
    }

    return result.join('');
};

let tests = [
    {
        params: ['abc', [[0,1],[1,2]]],
        ans: 'cab',
    },
    {
        params: ['abcdefg', [[1,1],[1,1],[0,2],[1,3]]],
        ans: 'efgabcd',
    },
];

tests.forEach(test => {
    let res = stringShift(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
