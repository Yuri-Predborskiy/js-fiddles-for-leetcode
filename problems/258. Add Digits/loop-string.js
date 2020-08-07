/*
Add digits till you have a root number

Loop-based solution
Convert number to string, split it into individual numbers
Add numbers
If result is more than 10, repeat

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {number} num
 * @return {number}
 */
let addDigits = function(num) {
    let numsArray = ('' + num).split('');
    while (numsArray.length > 1) {
        num = numsArray.reduce((acc, x) => + x + acc, 0);
        numsArray = ('' + num).split('');
    }
    return num;
};

let tests = [
    {params: [38], ans: 2},
    {params: [10], ans: 1},
];

tests.forEach(test => {
    let res = addDigits(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
