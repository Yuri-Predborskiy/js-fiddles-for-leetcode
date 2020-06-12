/*
Using binary search to find a range of repeating numbers
First perform binary search to find a narrow(er) range to search in or to return [-1, -1]
Then, do two more binary searches from the point of previous search to find exact ranges for left and right indexes

Time complexity: O(log(n))
Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let search = function(nums, target) {
    function findShift() {
        let left = 0, right = nums.length - 1, last = nums[0];
        let mid = -1;
        while (left <= right) {
            mid = Math.floor((left + right) / 2);
            if (nums[mid] >= last) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
            last = nums[mid];
        }
        return nums[left] < nums[right] ? left : right;
    }

    function binarySearch(shift = 0) {
        let left = 0, right = nums.length - 1;
        let mid = -1;
        while (left <= right) {
            mid = Math.floor((left + right) / 2);
            let value = nums[(mid + shift) % nums.length];
            if (value === target) {
                return (mid + shift) % nums.length;
            } else if (value > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return -1;
    }

    let shift = nums[0] > nums[nums.length - 1] ? findShift() : 0;
    return binarySearch(shift);
};

let tests = [
    {
        params: [[3,1], 1],
        ans: 1,
    },
    {
        params: [[3,1], 2],
        ans: -1,
    },
    {
        params: [[3,1], 3],
        ans: 0,
    },
    {
        params: [[4,5,6,7,0,1,2], 0],
        ans: 4,
    },
    {
        params: [[4,5,6,7,0,1,2], 3],
        ans: -1,
    },
    {
        params: [[4,5,6,7,0,1,2], 4],
        ans: 0,
    },
    {
        params: [[4,5,6,7,0,1,2], 2],
        ans: 6,
    },
    {
        params: [[4,5,6,7,0,1,2], 6],
        ans: 2,
    },
    {
        params: [[0,1,2,4,5,6,7], 6],
        ans: 5,
    },
    {
        params: [[0,1,2,4,5,6,7], 0],
        ans: 0,
    },
    {
        params: [[0,1,2,4,5,6,7], 3],
        ans: -1,
    },
];

tests.forEach(test => {
    let res = search(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
