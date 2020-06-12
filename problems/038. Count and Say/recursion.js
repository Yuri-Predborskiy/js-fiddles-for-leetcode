/*
Count elements and write their number

Recursive solution
Run function recursively for each n till we reach base case, then build solutions based on previous cases

Time complexity: O(n^2) execute function for each n up to n
Space complexity: O(n) we keep 2n elements at the same time
 */

/**
 * @param {number} n
 * @return {string}
 */
let countAndSay = function(n) {
    function helper(n) {
        if (n === 1) {
            return [1];
        }

        const arr = helper(n - 1);
        const result = [];
        let i = 1;
        let count = 1;
        while (i <= arr.length) {
            while (arr[i] === arr[i - 1]) {
                i++;
                count++;
            }
            result.push(count, arr[i - 1]);
            count = 1;
            i++;
        }
        return result;
    }
    return helper(n).join('');
};

let tests = [
    {params: [1], ans: '1'},
    {params: [4], ans: '1211'},
    {params: [5], ans: '111221'},
];

tests.forEach(test => {
    let res = countAndSay(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
