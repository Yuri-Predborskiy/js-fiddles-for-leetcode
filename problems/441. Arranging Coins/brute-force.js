/*
Given a number of coins calculate how many stacks can you build in staircase format
Staircase means every stack should be 1 coin higher than previous

Brute force (intuitive) solution
Calculate number of stacks you can build by incrementing counter by 1 at each step
Remove stack height from input
Stop when input goes to 0 or less
If input is less than zero, remove last stack as it is incomplete
Return count of stacks

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {number} n
 * @return {number}
 */
let arrangeCoins = function(n) {
    let cnt = 0;
    while (n > 0) {
        cnt++;
        n -= cnt;
    }
    return n === 0 ? cnt : cnt - 1;
};

let tests = [
    {params: [0], ans: 0},
    {params: [1], ans: 1},
    {params: [2], ans: 1},
    {params: [3], ans: 2},
    {params: [4], ans: 2},
    {params: [5], ans: 2},
    {params: [6], ans: 3},
];

tests.forEach(test => {
    let res = arrangeCoins(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
