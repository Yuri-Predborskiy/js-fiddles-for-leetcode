/*
Find single element in an array where every item is present twice (except for one item)
Calculate middle
If middle % 2 is not 0, decrement middle
Next element is middle + 1
If they're the same, search to the right
If they're not the same, check previous element. If they're not the same, return middle. If they are, search to the left

In the end you should find the unique element without ever exiting binary search loop

Time complexity: O(log(n)), binary search
Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let singleNonDuplicate = function(nums) {
    if (nums.length === 1) {
        return nums[0];
    }
    let left = 0, right = nums.length;
    while (left < right) {
        let middle = Math.floor((left + right) / 2);
        if (middle % 2 > 0) {
            middle--;
        }
        let next = middle + 1;
        if (nums[middle] !== nums[next]) {
            if (nums[middle] !== nums[middle - 1]) {
                return nums[middle];
            }
            right = middle;
        } else {
            left = middle + 2;
        }
    }
    // we should never reach this point
};

let tests = [
    {
        params: [[1,1,2,3,3,4,4,8,8]],
        ans: 2,
    },
    {
        params: [[1,1,2,2,3,4,4,5,5,6,6,7,7]],
        ans: 3,
    },
    {
        params: [[1,2,2]],
        ans: 1,
    },
    {
        params: [[1,1,2]],
        ans: 2,
    },
    {
        params: [[1]],
        ans: 1,
    },
];

tests.forEach(test => {
    let res = singleNonDuplicate(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});