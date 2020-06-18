/*
Find a specific element in an array
The main difficulty is in lack of clear description: find a input[index] = (input.length - index)

If the input is sorted, we can use binary search. So just sort!

Time complexity: O(n*log(n))
Space complexity: O(1)
 */

/**
 * @param {number[]} citations
 * @return {number}
 */
let hIndex = function(citations) {
    if (citations.length < 1) {
        return 0;
    }
    let left = 0;
    let right = citations.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right)/2);
        const h = citations.length - mid;
        if (citations[mid] === h) {
            return h;
        }
        if (citations[mid] < h) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return citations.length - left;
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
