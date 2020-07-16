/*
Performance testing in node.js example
Based on problem 50. Pow(x, n)
It executes a function 4 times with different parameter, repeating this call 100.000 times
Then it repeats the performance measurement 100 times and calculates average, min and max times
Then it is all logged in console
 */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let myPow = function(x, n) {
    function calc(x, n) {
        if (n === 0) {
            return 1;
        } else if (x === 0 || x === 1) {
            return x;
        } else if (x === -1) {
            return n % 2 === 0 ? 1 : -1;
        }

        if (n === 2) {
            return x * x;
        } else if (n % 2 !== 0) {
            return x * myPow(x, n - 1);
        }

        const half = myPow(x, n / 2);
        return half * half;
    }

    let isNegativePower = false;
    if (n < 0) {
        isNegativePower = true;
        n = -n;
    }

    let result = calc(x, n);

    return isNegativePower ? 1 / result : result;
};

const {performance} = require('perf_hooks');
const times = [];
for (let timer = 0; timer < 100; timer++) {
    let start = performance.now();
    for (let i = 0; i < 100000; i++) {
        myPow(2, 20);
        myPow(2.1, 3);
        myPow(2, -2);
        myPow(1.00001, 200000);
    }
    let finish = performance.now();
    times.push(finish - start);
}

let min = Infinity, max = 0, total = 0;
times.map(val => {
    min = Math.min(val, min);
    max = Math.max(val, max);
    total += val;
})

console.log('took', total / times.length, 'ms on average with min', min, 'and max', max);
