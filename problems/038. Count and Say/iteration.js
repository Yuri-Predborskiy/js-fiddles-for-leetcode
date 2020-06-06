/*
Count elements and write their number

Iterative solution
Build solution from base case where n = 1
Calculate solution for each following case till n

Time complexity: O(n^2) execute function for each n up to n
Space complexity: O(n) we keep 2n elements at the same time
 */

/**
 * @param {number} n
 * @return {string}
 */
let countAndSay = function(n) {
    let res = [1];
    for (let i = 2; i <= n; i++) {
        let temp = res;
        res = [];
        let count = 1;
        for (let j = 1; j <= temp.length; j++) {
            if (temp[j] === temp[j - 1]) {
                count++;
            } else {
                res.push(count, temp[j - 1]);
                count = 1;
            }
        }
    }
    return res.join('');
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
