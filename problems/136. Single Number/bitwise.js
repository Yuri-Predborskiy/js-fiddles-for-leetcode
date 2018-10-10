/*
    Solution using bitwise operation.
    every element has a duplicate, so if we swap bits twice, the element will be equal to 0
    The only element that won't "flip back" is the one that does not have a pair

    Time complexity: O(n), linear time
    Space complexity: O(1), constant space

    Drawback: in some 10 people may forget how (or why) to perform bitwise operations
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
let singleNumber = function(nums) {
    let bitwise = nums[0];
    for (let i = 1; i < nums.length; i++) {
        bitwise ^= nums[i];
    }
    return bitwise;
};

let tests = [
    { param: [2,2,1], ans: 1 },
    { param: [4,1,2,1,2], ans: 4 },
];

tests.forEach(test => {
    let res = singleNumber(test.param);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});

