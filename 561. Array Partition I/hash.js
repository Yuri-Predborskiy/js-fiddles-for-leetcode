/**
 * @param {number[]} nums
 * @return {number}
 */
let arrayPairSumHanging = function(nums) {
    let hash = [];
    for (let i = 0; i < 20001; ++i) {
        hash[i] = 0;
    }

    let sum = 0, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < nums.length; ++i) {
        let num = nums[i] + 10000;
        ++hash[num];
        min = Math.min(min, num);
        max = Math.max(max, num);
    }
    let take = 0;
    for(let i = min; i <= max; ++i){
        let repeats = hash[i];
        for(let j = 0; j < repeats; ++j) {
            if (take == 0) {
                sum += i - 10000;
            }
            take ^= 1;
        }
    }
    return sum;
};

let arrayPairSumWorking = function(nums) {
    let hash = Array(20000).fill(0), sum = 0, min = nums[0], max = nums[0];
    for (let i = 0; i < nums.length; ++i) {
        let num = nums[i] + 10000;
        ++hash[num];
        min = Math.min(min, num);
        max = Math.max(max, num);
    }
    let take = 1;
    for(let i = min; i <= max; ++i){
        let repeats = hash[i];
        for(let j = 0; j < repeats; ++j) {
            if (take) {
                sum += i - 10000;
            }
            take ^= 1;
        }
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
