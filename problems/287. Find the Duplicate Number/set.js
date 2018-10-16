/*
    This approach requires O(n) extra space.
    Add every item you iterate over as object properties. If such a property already exists - it is a duplicate
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
let findDuplicate = function(nums) {
    let set = {};
    for (let i = 0; i < nums.length; i++) {
        if (!set[nums[i]]) {
            set[nums[i]] = true;
        } else {
            return nums[i];
        }
    }
};

let tests = [
    { nums: [1,3,4,2,2], ans: 2 },
    { nums: [3,1,3,4,2], ans: 3 },
    { nums: [3,1,3,4,2,3,3], ans: 3 },
    { nums: [1,4,4,2,4], ans: 4 },
];

tests.forEach(test => {
    let res = findDuplicate(test.nums);
    let correct = res === test.ans ? 'CORRECT' : 'WRONG!';
    console.log(
        'expected:', test.ans,
        '| calculated:', res,
        '| result is', correct
    );
});
