/*
Count bits in every number up to n using dynamic programming and recursion
But iteratively, using memoization table instead of recursion

Time complexity: O(n)
Space complexity: O(n)
Brain complexity: O(n^n)
Inspired by Knowledge Center
https://www.youtube.com/watch?v=iuqr5hHk2MI
 */

/**
 * @param {number} num
 * @return {number[]}
 */
let countBits = function(num) {
    const results = new Array(num + 1).fill(0);
    for (let i = 1; i <= num; i++) {
        results[i] = results[i>>1] + i % 2;
    }
    return results;
};

let tests = [
    {params: [2], ans: [0,1,1]},
    {params: [5], ans: [0,1,1,2,1,2]}
];

tests.forEach(test => {
    let res = canConstruct(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
