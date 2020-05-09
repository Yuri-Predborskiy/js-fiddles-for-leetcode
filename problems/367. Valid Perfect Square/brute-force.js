/*
Solution using brute force

Time complexity: O(n)
Space complexity: O(1)

In order to find a number which, multiplied by itself, is equal to num, we may be able to get a better runtime
Since we're essentially searching for a number in a sorted list of numbers from 1 to num
And searching in a sorted array is faster when using binary search algorithm
 */

/**
 * @param {number} num
 * @return {boolean}
 */
let isPerfectSquare = function(num) {
    let check = 0;
    while (check * check < num) {
        check++;
    }
    return check * check === num;
};

let tests = [
    {
        params: [16],
        ans: true,
    },
    {
        params: [14],
        ans: false,
    },
    {
        params: [1],
        ans: true,
    },
];

tests.forEach(test => {
    let res = isPerfectSquare(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
