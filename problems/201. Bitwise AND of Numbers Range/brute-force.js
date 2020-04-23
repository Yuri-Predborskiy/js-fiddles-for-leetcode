// note: brute force is too slow for leetcode

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
let rangeBitwiseAnd = function(m, n) {
    let result = m;
    for (let i = m + 1; i <= n; i++) {
        result = result & i;
    }
    return result;
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
