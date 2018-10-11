/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
let containsNearbyDuplicate = function(nums, k) {
    let lastIndex = new Map(), last;
    for (let i = 0; i < nums.length; i++) {
        last = lastIndex.get(nums[i]) || -1;
        if (last !== -1 && Math.abs(i + 1 - last) <= k) {
            return true;
        }
        lastIndex.set(nums[i], i + 1);
    }
    return false;
};

let tests = [
    { inputs: [[1,2,3,1], 3], ans: true },
    { inputs: [[1,0,1,1], 1], ans: true },
    { inputs: [[1,2,3,1,2,3], 2], ans: false },
];

tests.forEach(test => {
    let res = containsNearbyDuplicate(...test.inputs);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
