/**
 * @param {number} n
 * @return {boolean}
 */
let isHappy = function(n) {
    function calculateSquares(nums) {
        let letters = '' + nums, res = 0;
        for (let i = 0; i < letters.length; i++) {
            res += Math.pow(Number.parseInt(letters[i]), 2);
        }
        return res;
    }

    if (n === 1) return true;
    if (n === 0) return false;

    let dict = {}, calc = calculateSquares(n);
    while (calc !== 1) {
        if (dict[calc]) return false;
        dict[calc] = true;
        calc = calculateSquares(calc);
    }
    return true;
};

let tests = [
    { input: 19, ans: true },
];

tests.forEach(test => {
    let res = isHappy(test.input);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
