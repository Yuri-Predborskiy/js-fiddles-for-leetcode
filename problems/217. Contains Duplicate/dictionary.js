/*
    Solution using dictionary.
    Go over the array and add every element to a set.
    If you've seen this element before (it exists in the set) return true.
    If you iterated through the entire array, return false.

    Time complexity: O(n), linear time
    Space complexity: O(n) - requires same amount of space as input for the dictionary
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let dict = {};
    for (let i = 0; i < nums.length; i++) {
        if (dict[nums[i]]) {
            return true;
        }
        dict[nums[i]] = true;
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

