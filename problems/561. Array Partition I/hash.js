// todo: write proper explanation in a separate file
/**
 * @param {number[]} nums
 * @return {number}
 */
let arrayPairSum = function(nums) {
    // create a hash table where array index = key (nums item), array value = number of times key repeats in nums
    // purpose - to provide a pre-defined hash table that can be used in place of a sorted array
    // sorting is O(n*log(n)), a slow operation
    // iterating through the array of nums once and creating an index of values is O(n), faster
    let hash = [];
    for (let i = 0; i < 20001; ++i) {
        hash[i] = 0;
    }

    let sum = 0, min = Infinity, max = -Infinity;
    for (let i = 0; i < nums.length; ++i) {
        let num = nums[i] + 10000;
        ++hash[num];
        min = Math.min(min, num);
        max = Math.max(max, num);
    }

    // all values are "pairs", we need to take a smaller value of a pair but aim to maximize sum of pairs (sum of smaller values in pairs)
    // we can achieve this by gathering values with minimum difference into pairs so that the smallest amount is lost in a pair
    // this can be achieved via sorting (we achieved this via hash table instead of sorting, which is faster)
    // in order to emulate pairs of values, we simply take every other value, and switch "take" on/off on every pass
    let take = true;
    for (let i = min; i <= max; ++i){
        // if hash table value is 0, we didn't have this number in nums, so we shouldn't consider it
        if (!hash[i]) continue;
        for (let j = 0; j < hash[i]; ++j) {
            if (take) {
                sum += i - 10000;
            }
            take = !take;
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
