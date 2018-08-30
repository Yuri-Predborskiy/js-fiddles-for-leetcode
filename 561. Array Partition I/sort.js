/**
 * @param {number[]} nums
 * @return {number}
 */
let arrayPairSum = function(nums) {
    nums.sort((a, b) => a > b ? 1 : -1);
    let sum = 0;
    for (let i = 0; i < nums.length; i += 2) {
        sum += nums[i];
    }
    return sum;
};

let tests = [
    { strings: [1,4,3,2], ans: 4 },
    { strings: [6214, -2290, 2833, -7908], ans: -5075 },
];

tests.forEach(test => {
    let res = arrayPairSum(test.strings);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
