/*
    Slower solution that uses less code and modern Javascript features (destructuring).
*/
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
let addBinary = function(a, b) {
    let [long, short] = a.length >= b.length ? [a, b] : [b, a];
    let shift = long.length - short.length;
    let res = [], remainder = 0;
    for (let i = long.length - 1; i >= 0; --i) {
        res[i] = Number(long[i]) + (Number(short[i - shift]) || 0) + (remainder ? remainder-- : 0);
        if (res[i] > 1) {
            remainder = Math.floor(res[i] / 2);
            res[i] = res[i] % 2;
        }
    }
    if (remainder > 0) {
        res.unshift('1');
    }
    return res.join('');
};

let tests = [
    { a: '11', b: '11', ans: '110' },
    { a: '0', b: '1', ans: '1' },
    { a: '10', b: '1', ans: '11' },
    { a: '11', b: '1', ans: '100' },
    { a: '1010', b: '1', ans: '1011' },
    { a: '1010', b: '1011', ans: '10101' },
];

tests.forEach(test => {
    let res = addBinary(test.a, test.b);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
