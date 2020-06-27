/*
Find the smallest number of perfect squares that add up to number
Math says the answer is between 1 and 4

Dynamic programming approach.
You can express any number as sum of previously calculated numbers + 1
    or as 1 if it is a perfect square itself
Thus, build a dp table (numSq, number of perfect squares that add up to index)
Then fill it with numbers

Solution inspired by discussion:
https://leetcode.com/problems/perfect-squares/discuss/71488/

Time complexity: O(n*log(n))
Space complexity: O(n)
 */

/**
 * @param {number} n
 * @return {number}
 */
let numSquares = function(n) {
    if (n < 1) {
        return 0;
    }
    const numSq = new Array(n + 1).fill(Infinity);
    numSq[0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j*j <= i; j++) {
            numSq[i] = Math.min(numSq[i], numSq[i - j*j] + 1);
        }
    }
    return numSq[n];
};

let tests = [
    {params: [1], ans: 1},
    {params: [12], ans: 3},
    {params: [13], ans: 2},
];

tests.forEach(test => {
    let res = numSquares(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
