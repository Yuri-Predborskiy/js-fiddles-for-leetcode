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
    {params: ['11', '11'], ans: '110'},
    {params: ['0', '1'], ans: '1'},
    {params: ['10', '1'], ans: '11'},
    {params: ['1010', '1'], ans: '1011'},
    {params: ['1010', '1011'], ans: '10101'},
    {params: ['11', '11'], ans: '110'},
];

tests.forEach(test => {
    let res = addBinary(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
