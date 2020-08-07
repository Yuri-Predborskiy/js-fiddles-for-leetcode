/*
Add two numbers represented as binary (0 and 1 only), which is longer than 32 bits

Solution via string comparison
Compare string on the left with string on the right and build result, one item at a time
In order to simplify traversal, add leading zeroes to shorter string

Solution can be optimized if we skip adding leading zeroes, but we'd need to use individual indexes

Time complexity: O(n)
Space complexity: O(n)
*/

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
let addBinary = function(a, b) {
    const length = Math.max(a.length, b.length);
    if (a.length < length) {
        a = a.padStart(length, '0');
    } else {
        b = b.padStart(length, '0');
    }
    let carryOver = false;
    let result = a.split('');
    for (let i = length - 1; i >= 0; i--) {
        let state = 0;
        if (result[i] === '1') {
            state++;
        }
        if (b[i] === '1') {
            state++;
        }
        if (carryOver) {
            state++;
        }
        if (state === 1) {
            result[i] = 1;
            carryOver = false;
        } else if (state === 2) {
            result[i] = 0;
            carryOver = true;
        } else if (state === 3) {
            result[i] = 1;
            carryOver = true;
        } else {
            result[i] = 0;
            carryOver = false;
        }
    }

    return carryOver ? '1' + result.join('') : result.join('');
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
