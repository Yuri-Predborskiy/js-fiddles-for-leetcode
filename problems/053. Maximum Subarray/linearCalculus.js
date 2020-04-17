// calculate continuous sum of elements till it goes below 0
// if the current sum is less than 0, set it to 0 and restart sum by adding current item
// if there is a consecutive subarray whose total is bigger than any one number, we'll find it

/**
 * @param {number[]} nums
 * @return {number}
 */
let maxSubArray = function(nums) {
    let sumSoFar = -Infinity;
    let max = -Infinity;
    for (let num of nums) {
        if (sumSoFar < 0) {
            sumSoFar = 0;
        }
        sumSoFar += num;
        if (sumSoFar > max) {
            max = sumSoFar;
        }
    }
    return max;
};

let tests = [
    {
        params: [[-2,1,-3,4,-1,2,1,-5,4]],
        ans: 6,
    },
];

tests.forEach(test => {
    let res = maxSubArray(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
