/*
    Solution using dictionary (hash table).
    Go over the array and add every element to dictionary.
    If you've seen this element before (it exists in the dictionary) delete it.
    Once done, return the first value that exists in the object.

    Time complexity: O(n), linear time
    Space complexity: O(n) - required for dictionary
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
let singleNumber = function(nums) {
    let dict = {};
    for (let i = 0; i < nums.length; i++) {
        if (typeof dict[nums[i]] !== 'undefined') {
            delete dict[nums[i]];
        } else {
            dict[nums[i]] = nums[i];
        }
    }
    return Object.values(dict)[0];
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

