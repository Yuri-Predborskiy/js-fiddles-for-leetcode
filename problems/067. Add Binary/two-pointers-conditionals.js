/*
Add two numbers represented as binary (0 and 1 only), which is longer than 32 bits

Solution via string comparison
Compare string on the left with string on the right and build result, one item at a time
Use two pointers to improve execution speed (do not add leading zeroes)

Time complexity: O(n)
Space complexity: O(n)
*/

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
let addBinary = function(a, b) {
    let left = a.length - 1;
    let right = b.length - 1;
    let insertIndex = Math.max(left, right);
    let carryOver = false;
    let result = new Array(insertIndex + 1);
    while (left >= 0 || right >= 0) {
        let state = 0;
        if (a[left--] === '1') {
            state++;
        }
        if (b[right--] === '1') {
            state++;
        }
        if (carryOver) {
            state++;
        }
        if (state < 2) {
            result[insertIndex] = state;
            carryOver = false;
        } else {
            result[insertIndex] = state === 2 ? 0 : 1;
            carryOver = true;
        }
        insertIndex--;
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
