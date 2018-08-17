/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let myPow = function(x, n) {
    if (n === 0 || x === 1) return 1;
    if (n < 0) {
        n = -n;
        x = 1/x;
    }
    if (n % 3 === 0) {
        return myPow(x * x * x, n / 3);
    } else if (n % 2 === 0) {
        return myPow(x * x, n / 2);
    } else {
        return x * myPow(x, --n);
    }
};

let tests = [
    { x: 2, n: 10, ans: 1024 },
    { x: 2, n: 2, ans: 4 },
    { x: 2, n: 1, ans: 2 },
    { x: 2, n: 0, ans: 1 },
    { x: 1, n: 4, ans: 1 },
    { x: 2.10000, n: 3, ans: 9.261 },
    { x: 2, n: -2, ans: 0.25 },
    { x: 10, n: 10, ans: 10000000000 },
    { x: 2, n: 30, ans: 1073741824 }
];

tests.forEach(test => {
    let res = Math.round(myPow(test.x, test.n)*100000)/100000;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
