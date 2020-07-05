/*
Calculate number of bits that differ

String solution
Convert both numbers into bits and compare bit by bit
In order to simplify comparison we add leading zeros using padStart (built-in JS function)s

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
let hammingDistance = function(x, y) {
    if (x === y) {
        return 0;
    }
    const xs = x.toString(2).padStart(32, '0');
    const ys = y.toString(2).padStart(32, '0');
    const length = Math.max(xs.length, ys.length);
    let count = 0;
    for (let i = 0; i < length; i++) {
        if (xs[i] !== ys[i] && (xs[i] === '1' || ys[i] === '1')) {
            count++;
        }
    }
    return count;
};

let tests = [
    {params: [1, 4], ans: 2},
    {params: [4, 14], ans: 2},
];

tests.forEach(test => {
    let res = hammingDistance(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
