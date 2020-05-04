// walk over the string and change every letter

/**
 * @param {number} num
 * @return {number}
 */
let findComplement = function(num) {
    let bin = num.toString(2);
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
    let res = findComplement(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
