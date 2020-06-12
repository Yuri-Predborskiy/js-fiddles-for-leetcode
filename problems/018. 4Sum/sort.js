/*
Find all combinations of 4 elements that add up to target
Avoid duplicate combinations

Double 2-sum
First, take first element and last element as outerLeft and outerRight
Then work through the middle (left and right) elements in sliding window style.
Move left or right index if target not reached, otherwise move both
Then move outerRight index by one step
When done trying all outerRight indexes, increment outerLeft index by one, repeat

Current approach reduces time complexity from O(n^4) to O(n^3)

Time complexity: O(n^3)
Space complexity: O(n)
 */

const {compareArrays} = require('../helper');

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
let fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);
    const zeroMap = new Map();
    for (let outerLeft = 0; outerLeft < nums.length - 3; outerLeft++) {
        if (nums[outerLeft] === nums[outerLeft - 1]) {
            continue;
        }
        for (let outerRight = nums.length - 1; outerRight >= outerLeft; outerRight--) {
            if (outerRight === outerLeft + 2) {
                break;
            }
            if (nums[outerRight] === nums[outerRight + 1]) {
                continue;
            }
            let left = outerLeft + 1;
            let right = outerRight - 1;
            const outerSum = nums[outerLeft] + nums[outerRight];
            while (left < right) {
                let sum = outerSum + nums[left] + nums[right];
                if (sum === target) {
                    const key = nums[outerLeft] + ':' + nums[left] + ':' + nums[right] + ':' + nums[outerRight];
                    zeroMap.set(key, [nums[outerLeft], nums[left], nums[right], nums[outerRight]]);
                    left++;
                    right--;
                    // skip duplicates
                    while (nums[left] === nums[left - 1]) {
                        left++;
                    }
                    while (nums[right] === nums[right + 1]) {
                        right++;
                    }
                } else if (sum > target) {
                    right--;
                } else {
                    left++;
                }
            }
            while (outerLeft < outerRight && nums[outerRight] === nums[outerRight + 1]) {
                outerRight--;
            }
            while (outerLeft < outerRight && nums[outerLeft] === nums[outerLeft - 1]) {
                outerLeft++;
            }
        }
    }
    return [...zeroMap.values()];
};

let tests = [
    {
        params: [[1, 0, -1, 0, -2, 2], 0],
        ans: [
            [-1,  0, 0, 1],
            [-2, -1, 1, 2],
            [-2,  0, 0, 2]
        ]
    },
    {
        params: [[0,0,0,0], 1],
        ans: []
    },
    {
        params: [[-5,5,4,-3,0,0,4,-2], 4],
        ans: [[-5,0,4,5],[-3,-2,4,5]]
    },
];

tests.forEach(test => {
    let res = fourSum(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
