/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
let fourSumCount = function(A, B, C, D) {
    let res = 0, dict = new Map();
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {
            let sum = A[i] + B[j];
            if (dict.has(sum)) {
                dict.set(sum, dict.get(sum) + 1);
            } else {
                dict.set(sum, 1);
            }
        }
    }

    for (let i = 0; i < C.length; i++) {
        for (let j = 0; j < D.length; j++) {
            let sum = - C[i] - D[j];
            if (dict.has(sum)) {
                res += dict.get(sum);
            }
        }
    }
    return res;
};

let tests = [
    { params: [[ 1, 2], [-2,-1], [-1, 2], [ 0, 2]], ans: 2 },
    { params: [[-1,-1], [-1, 1], [-1, 1], [ 1,-1]], ans: 6 },
];

tests.forEach(test => {
    let res = fourSumCount(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
