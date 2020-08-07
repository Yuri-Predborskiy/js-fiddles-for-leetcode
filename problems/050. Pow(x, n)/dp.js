/*
Implement pow(x, y)

Optimized solution based on re-using previous calculations
Basically, when n can be divided by 2, we perform one calculation for half of n and multiply result by itself
Otherwise, we subtract 1 from n and perform the same thing, but multiply the result by base number once
The idea is to cut power in half (at least) after every iteration

Time complexity: O(log(n))
Space complexity: O(1) outside of recursion stack
 */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let myPow = function(x, n) {
    function calc(base, power) {
        if (power === 1) {
            return base;
        } else if (power === 2) {
            return base * base;
        } else if (power % 2 !== 0) {
            let half = calc(base, (power - 1) / 2);
            return base * half * half;
        }

        const half = calc(base, power / 2);
        return half * half;
    }

    if (n === 0) {
        return 1;
    } else if (x === 0 || x === 1) {
        return x;
    } else if (x === -1) {
        return n % 2 === 0 ? 1 : -1;
    }

    let isNegativePower = false;
    if (n < 0) {
        isNegativePower = true;
        n = -n;
    }

    let result = calc(x, n);

    return isNegativePower ? 1 / result : result;
};

let tests = [
    {params: [2.00000, 10], ans: 1024.00000},
    {params: [2.10000, 3], ans: 9.26100},
    {params: [2.00000, -2], ans: 0.25000},
    {params: [1.00001, 200000], ans: 7.38898},
    {params: [1.00000, 2**30], ans: 1},
];

tests.forEach(test => {
    let res = Math.round(myPow(...test.params) * 100000) / 100000;
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
