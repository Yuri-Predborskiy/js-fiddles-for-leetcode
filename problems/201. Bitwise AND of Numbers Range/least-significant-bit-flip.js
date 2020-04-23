// least significant bit flip solution
// source and explanation in the following link
// https://www.geeksforgeeks.org/bitwise-and-or-of-a-range/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
let rangeBitwiseAnd = function(m, n) {
    while (m < n) {
        n -= (n & -n);
    }
    return n;
};

let tests = [
    {
        params: [0,1],
        ans: 0,
    },
    {
        params: [5,7],
        ans: 4,
    },
    {
        params: [0,2147483647],
        ans: 0,
    },
];

tests.forEach(test => {
    let res = rangeBitwiseAnd(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
