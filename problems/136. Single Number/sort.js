/*
    Solution using sorting
    Sort the array, check if any element is equal to next element. If not, return it
    If we reached the end, return last element (every other element had a pair)

    Time complexity: O(N*logN) for sorting
    Space complexity: O(1), constant space
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 2; i += 2) {
        if (nums[i] !== nums[i + 1]) {
            return nums[i];
        }
    }
    return nums[nums.length - 1];
};

let tests = [
    { param: [1,2,3,1], ans: true },
    { param: [1,2,3,4], ans: false },
    { param: [1,1,1,3,3,4,3,2,4,2], ans: true },
];

tests.forEach(test => {
    let res = singleNumber(test.param);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});

