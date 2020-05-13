/*
Remove K digits from a number that is represented as a string
Greedy algorithm + stack

Time complexity: O(n)
Space complexity: O(n) for result (because strings are immutable)
 */

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
let removeKDigits = function(num, k) {
    if (num.length === k) {
        return '0';
    }

    const stack = [];
    let index = 0;
    while (index < num.length) {
        while (num[index] < stack[stack.length - 1] && k > 0) {
            stack.pop();
            k--;
        }
        stack.push(num[index]);
        index++;
    }
    const result = [];
    index = 0;
    // skip leading zeroes
    while (stack[index] === '0') {
        index++;
    }
    // copy remaining numbers to result stack, if we have numbers to remove, skip them from the end
    while (index < stack.length - k) {
        result.push(stack[index]);
        index++;
    }
    return result.join('') || '0';
};

let tests = [
    {params: ['1432219', 3], ans: '1219'},
    {params: ['0', 1], ans: '0'},
    {params: ['100', 1], ans: '0'},
    {params: ['100200', 1], ans: '200'},
    {params: ['1111', 1], ans: '111'},
    {params: ['12345', 1], ans: '1234'},
    {params: ['54321', 1], ans: '4321'},
    {params: ['5316542651', 3], ans: '1542651'},
    {params: ['531638201', 3], ans: '138201'},
];

tests.forEach(test => {
    let res = removeKDigits(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});