// most significant bit solution
// source and explanation in the following link
// https://www.geeksforgeeks.org/bitwise-and-or-of-a-range/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
let rangeBitwiseAnd = function(m, n) {
    // msb = most significant bit
    function getMSBPosition(number) {
        let mostSignificantBitPosition = -1;
        while (number > 0) {
            number = number >> 1;
            mostSignificantBitPosition++;
        }

        return mostSignificantBitPosition;
    }

    let res = 0;

    while (m > 0 && n > 0) {
        let mPos = getMSBPosition(m);
        if (mPos !== getMSBPosition(n)) {
            break;
        }

        let value = 1 << mPos;
        res += value;

        m -= value;
        n -= value;
    }

    return res;
};

let tests = [
    {
        params: [0,1],
        ans: 0,
    },
    {
        params: [5,7],
        ans: 4,
    },
    {
        params: [0,2147483647],
        ans: 0,
    },
];

tests.forEach(test => {
    let res = rangeBitwiseAnd(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
