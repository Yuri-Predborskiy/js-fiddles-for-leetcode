/*
    Solution using sorting
    Sort the array, check if any element matches next element
    If an element matches next element - return true (in a sorted array duplicates will be adjacent)

    Time complexity: O(N*logN) for sorting
    Space complexity: O(1), constant time
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            return true;
        }
    }
    return false;
};

let tests = [
    { param: [1,2,3,1], ans: true },
    { param: [1,2,3,4], ans: false },
    { param: [1,1,1,3,3,4,3,2,4,2], ans: true },
];

tests.forEach(test => {
    let res = containsDuplicate(test.param);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});

