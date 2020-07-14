/*
Restore IP Addresses from a string, create all possible combinations
Problem is similar to "decode ways" - calculate all possible decoding variants of an encoded string

Solution using backtracking
Try to break string down into substrings 1-3 symbols long
Check if each group fits into requirements (number is between 0 and 255, inclusive)
Leading zero is not allowed, except number 0 itself
If you have 4 groups and you've used every number in the string - save this result
Exit if you have too many groups or not enough characters in the string to create 4 groups
Exit if number in a group is too large (more than 255)

Use backtracking to try all group combinations we can use. Save those that are valid

Time complexity: O(2^n) worst case since we're basically making a power set of inputs
Space complexity O(2^n) worst case, average is less since we don't save all possible combinations
 */

const {
    compareArrays
} = require('../helper');

/**
 * @param {string} s
 * @return {string[]}
 */
let restoreIpAddresses = function(s) {
    function processGroup(numbers, index, groups) {
        if (index === numbers.length) {
            if (groups.length === 4) {
                results.push(groups.join('.'));
            }
            return;
        } else if (groups.length === 4) {
            return;
        }

        const maxIndex = Math.min(index + 3, numbers.length);
        for (let limit = index + 1; limit <= maxIndex; limit++) {
            if (numbers[index] === '0' && limit > index + 1) {
                return;
            }
            const num = parseInt(numbers.substring(index, limit));
            if (num < 256) {
                groups.push(num);
                processGroup(numbers, limit, groups);
                groups.pop();
            }
        }
    }

    const results = [];
    processGroup(s, 0, []);
    return results;
};

let tests = [
    {params: ['25525511135'], ans: ["255.255.11.135","255.255.111.35"]},
    {params: ['0000'], ans: ["0.0.0.0"]},
    {params: ['010010'], ans: ["0.10.0.10","0.100.1.0"]},
    {
        params: ['111111111'],
        ans: [
            "1.11.111.111","1.111.11.111","1.111.111.11",
            "11.1.111.111","11.11.11.111","11.11.111.11",
            "11.111.1.111","11.111.11.11","11.111.111.1",
            "111.1.11.111","111.1.111.11","111.11.1.111",
            "111.11.11.11","111.11.111.1","111.111.1.11","111.111.11.1"
        ]
    },
];

tests.forEach(test => {
    let res = restoreIpAddresses(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
