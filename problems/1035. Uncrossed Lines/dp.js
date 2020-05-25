/*
Uncrossed lines
You can draw a line from top to bottom if numbers are identical
You may not draw multiple numbers from/to same number
Return maximum number of lines you can draw without any lines crossing

Dynamic programming solution, algorithm from the following video:


Time complexity: O(n * m) where n, m are lengths of inputs, O(n^2) if lengths are equal
Space complexity: O(n * m)
 */

/**
 * @param {number[]} top
 * @param {number[]} bottom
 * @return {number}
 */
let maxUncrossedLines = function(top, bottom) {
    const dp = new Array(top.length + 1);
    for (let i = 0; i <= top.length; i++) {
        dp[i] = new Array(bottom.length + 1).fill(0);
    }

    for (let row = 1; row <= top.length; row++) {
        for (let col = 1; col <= bottom.length; col++) {
            if (top[row - 1] === bottom[col - 1]) {
                dp[row][col] = dp[row - 1][col - 1] + 1;
            } else {
                dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
            }
        }
    }
    return dp[top.length][bottom.length];
};

let tests = [
    {params: [[3,3], [3]], ans: 1},
    {params: [[2,1], [1,2,1,3,3,2]], ans: 2},
    {params: [[1,4,2], [1,2,4]], ans: 2},
    {params: [[2,5,1,2,5], [10,5,2,1,5,2]], ans: 3},
    {params: [[1,3,7,1,7,5], [1,9,2,5,1]], ans: 2},
    {
        params: [
            [2,3,4,1,3,3,2,4,2,2,1,5,2,4,3,4,4,5,1,5,1,5,4,3,1,2,5,2,4,4],
            [2,2,4,2,4,1,1,5,5,3,2,1,1,1,3,1,2,5,2,4,3,4,5,5,3,3,5,1,4,3]
        ],
        ans: 16
    },
];

tests.forEach(test => {
    let res = maxUncrossedLines(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
