/*
Calculate the number of operations that need to be performed to change word1 into word2
Solution using 2d dynamic programming matrix

Each row shows how many changes are required for each letter in word1 to become word2
If letters are identical, take value at the top-left corner of DP table
If letters are different, take minimum of previous, top and diagonal left-top element and add 1.
Solution is in the final row/column of dp table

Time complexity: O(n)
Space complexity: O(n)
Solution inspired by Tushar Roy - Coding Made Simple youtube channel
https://www.youtube.com/watch?v=We3YDTzNXEk
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
let minDistance = function(word1, word2) {
    const dp = new Array(word2.length + 1);
    for (let row = 0; row <= word2.length; row++) {
        dp[row] = new Array(word1.length + 1);
    }

    for (let row = 0; row < dp.length; row++) {
        for (let col = 0; col < dp[0].length; col++) {
            // for rows and columns first row/col = col/row index
            if (col === 0) {
                dp[row][col] = row;
            } else if (row === 0) {
                dp[row][col] = col;
            } else if (word1[col - 1] === word2[row - 1]) {
                dp[row][col] = dp[row - 1][col - 1];
            } else {
                dp[row][col] = Math.min(dp[row - 1][col], dp[row][col - 1], dp[row - 1][col - 1]) + 1;
            }
        }
    }

    return dp[dp.length - 1][dp[0].length - 1];
};

let tests = [
    {params: ['horse', 'ros'], ans: 3},
    {params: ['intention', 'execution'], ans: 5},
];

tests.forEach(test => {
    let res = minDistance(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
