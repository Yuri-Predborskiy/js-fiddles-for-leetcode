/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let myPow = function(x, n) {
    function pow(x, n) {
        if (n === 0) return 1;
        if (n % 3 === 0) {
            return pow(x * x * x, n / 3);
        } else if (n % 2 === 0) {
            return pow(x * x, n / 2);
        } else {
            return x * pow(x, --n);
        }
    }

    if (x === 1) return 1;
    if (n < 0) {
        n = -n;
        x = 1/x;
    }
    return pow(x, n);
};

// using a while loop
let myPow2 = function(x, n) {
    if (x === 1 || n === 0) return 1;

    if (n < 0) {
        n = -n;
        x = 1/x;
    }

    let res = 1;

    while (n > 0) {
        if (n % 2 === 1) {
            res *= x;
            --n;
        }
        x *= x;
        n /= 2;
    }

    return res;
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
    let res = Math.round(myPow2(test.x, test.n)*100000)/100000;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
