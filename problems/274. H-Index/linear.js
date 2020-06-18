/*
Count elements in the input to figure out an h-index of the provided numbers that is calculated using specific formula

Solution using count sort - technique that does not sort elements but creates sorted count of elements
This is a "hard" solution using linear time complexity.
Instead of sorting the elements, we create a sorted count of elements.
We then add up counts from the end to find index where count >= index
This index is our return value.

Time complexity: O(n)
Space complexity: O(n)

Inspired by comment by user DyXrLxSTAOadoD in the following discussion
https://leetcode.com/problems/h-index/discuss/70810/A-Clean-O(N)-Solution-in-Java/584589
 */

/**
 * @param {number[]} citations
 * @return {number}
 */
let hIndex = function(citations) {
    const len = citations.length;
    const count = new Array(len + 1).fill(0);
    for (const citation of citations) {
        if (citation > len) {
            count[len]++;
        } else {
            count[citation]++;
        }
    }

    let total = 0;
    for (let i = len; i >= 0; i--) {
        total += count[i];
        if (total >= i) {
            return i;
        }
    }
    return 0;
};

let tests = [
    {params: [[100]], ans: 1},
    {params: [[0]], ans: 0},
    {params: [[0,1,3,5,6]], ans: 3},
    {params: [[0,1]], ans: 1},
];

tests.forEach(test => {
    let res = hIndex(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
