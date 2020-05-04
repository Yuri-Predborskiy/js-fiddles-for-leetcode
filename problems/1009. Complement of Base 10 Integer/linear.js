// walk over the binary string and flip every bit

/**
 * @param {number} N
 * @return {number}
 */
let bitwiseComplement = function(N) {
    let bin = N.toString(2);
    let res = [];
    for (let num of bin) {
        res.push(1 - num);
    }
    return parseInt(res.join(''), 2);
};

let tests = [
    { params: [5], ans: 2 },
    { params: [1], ans: 0 },
];

tests.forEach(test => {
    let res = bitwiseComplement(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
