/*
    Pure math solution, using Lagrange's theorem (the answer is 1..4, and we use math to figure it out)
    Inspired by Shellhead @ leetcode:
    https://leetcode.com/problems/perfect-squares/discuss/165063/MATHEMATIC-SOLUTION-!!-EASY-Lagrange's-Four-Square-theorem
    The benefit of this solution - it is faster than using stack.
 */
/**
 * @param {number} n
 * @return {number}
 */
let numSquares = function(n) {
    function isSquare(num) {
        let root = Math.sqrt(num);
        return !(root % (root >> 0));
    }

    // num is a perfect square, answer is 1
    if (isSquare(n)) return 1;

    // 2 - a perfect square multiplied by square root (rounded down)
    let root = Math.sqrt(n) >> 0; // floor
    for (let i = 1; i <= root; i++) {
        if (isSquare(n - i * i)) return 2;
    }

    // 4 - sort of unique case, not 4^k(8m+7)
    while (n % 4 === 0) {
        n = n / 4; // divide by 4
    }
    if (n % 8 === 7) {
        return 4;
    }

    // for all other cases the answer is 3
    return 3;
};

let tests = [
    { params: [1], ans: 1, },
    { params: [12], ans: 3, },
    { params: [13], ans: 2, },
];

tests.forEach(test => {
    let res = numSquares(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
