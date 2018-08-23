/*
    Faster solution that relies on string comparison and control flow.
*/
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
let addBinary = function(a, b) {
    let long, short;
    if (a.length > b.length) {
        long = a;
        short = b;
    } else {
        long = b;
        short = a;
    }
    let shift = long.length - short.length;
    let res = [], remainder = 0;
    for (let i = long.length - 1; i >= 0; --i) {
        if (remainder === 0) {
            if (long[i] === '1' && short[i - shift] === '1') {
                res[i] = '0';
                ++remainder;
            } else if (long[i] === '1' || short[i - shift] === '1') {
                res[i] = '1';
            } else {
                res[i] = '0';
            }
        } else {
            if (long[i] === '1' && short[i - shift] === '1') {
                res[i] = '1';
            } else if (long[i] === '1' || short[i - shift] === '1') {
                res[i] = '0';
            } else {
                res[i] = '1';
                --remainder;
            }
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
