/*
Dynamic programming solution
Construct a matrix of max common substring lengths. Intersection of two points marks the longest substring encountered
    at respective indexes of the two inputs
Example
  a b c d e
a 1 1 1 1 1
c 1 1 2 2 2
e 1 1 2 2 3
The answer is the final number in the matrix (longest substring encountered)
Idea:
when the letters match, take longest substring at index [row - 1][col - 1] and add 1
if the letters don't match, take max from [row-1][col] and [row][col-1] (top and left)
This way we will know the longest substring at every intersection of substring combinations
Actual combinations are ignored, only maximum number is saved

n, m - lengths of string inputs
Time complexity: O(n*m), we have to iterate over all combinations of both inputs, one letter at a time
Space complexity: O(n*m), we have to construct a matrix of max substring lengths at each comparison, size is m*n
 */

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
let longestCommonSubsequence = function(text1, text2) {
    const lcs = [];
    for (let row = 0; row < text1.length; row++) {
        if (!lcs[row]) {
            lcs[row] = new Array(text2.length);
        }
        for (let col = 0; col < text2.length; col++) {
            if (text1[row] === text2[col]) {
                // if either row-1 or col-1 do not exist, use 0 in their place, otherwise use value at [row-1][col-1]
                lcs[row][col] = (lcs[row - 1] ? lcs[row - 1][col - 1] || 0 : 0) + 1;
            } else {
                let top = lcs[row - 1] ? lcs[row - 1][col] : 0;
                let left = lcs[row][col - 1] || 0;
                lcs[row][col] = Math.max(top, left);
            }
        }
    }
    return lcs[text1.length - 1][text2.length - 1];
};

let tests = [
    {
        params: ['abcde', 'ace'],
        ans: 3,
    },
    {
        params: ['ace', 'ace'],
        ans: 3,
    },
    {
        params: ['abc', 'def'],
        ans: 0,
    },
    {
        params: ['pmjghexybyrgzczy', 'hafcdqbgncrcbihkd'],
        ans: 4,
    }
];

tests.forEach(test => {
    let res = longestCommonSubsequence(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
