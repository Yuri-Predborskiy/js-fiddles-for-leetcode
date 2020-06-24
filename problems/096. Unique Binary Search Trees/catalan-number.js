/*
Calculate number of unique binary trees one can create from a row of numbers from 1 to n
Calculation is identical to calculating nth Catalan Number

Time complexity: O(n)
Space complexity: O(1)

Solution inspired by Geeks for Geeks site problem:
https://www.geeksforgeeks.org/program-nth-catalan-number/
 */

/**
 * @param {number} n
 * @return {number}
 */
let numTrees = function(n) {
    function binomialCoeff(n, k) {
        let res = 1;
        if (k > n - k) {
            k = n - k;
        }

        for (let i = 0; i < k; i++) {
            res *= (n - i);
            res = Math.floor(res / (i + 1));
        }
        return res;
    }

    let c = binomialCoeff(2 * n, n);
    return c / (n + 1);
};

let tests = [
    {params: [1], ans: 1},
    {params: [2], ans: 2},
    {params: [3], ans: 5},
    {params: [4], ans: 14},
    {params: [5], ans: 42},
];

tests.forEach(test => {
    let res = numTrees(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
