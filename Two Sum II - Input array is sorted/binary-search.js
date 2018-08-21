/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    function findNext(left, right, target, direction) {
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        if (direction > 0) {
            return (nums[left] > target && left + 1 < nums.length)  ? left + 1 : left;
        } else {
            return (nums[right] > target && right - 1 > 0) ? right - 1 : right;
        }
    }

    let left = 0, right = nums.length - 1;

    while (nums[left] + nums[right] !== target) {
        if (nums[left] + nums[right] === target) {
            break;
        } else if (nums[left] + nums[right] > target) {
            right = findNext(left, right - 1, target - nums[left], -1);
        } else {
            left = findNext(left + 1, right, target - nums[right], 1);
        }
    }
    return [left + 1, right + 1];
};

let tests = [
    { nums: [2,7,11,15], target: 9, ans: [1,2] },
    { nums: [0,1,2,3,4,5,7,11,15], target: 9, ans: [3,7] },
    {
        nums: [
            12,13,23,28,43,44,59,60,61,68,70,86,88,92,124,125,136,168,173,173,180,199,212,221,227,230,277,282,
            306,314,316,321,325,328,336,337,363,365,368,370,370,371,375,384,387,394,400,404,414,422,422,427,430,
            435,457,493,506,527,531,538,541,546,568,583,585,587,650,652,677,691,730,737,740,751,755,764,778,783,
            785,789,794,803,809,815,847,858,863,863,874,887,896,916,920,926,927,930,933,957,981,997
        ],
        target: 542,
        ans: [24,32]
    }
];

tests.forEach(test => {
    let res = twoSum(test.nums, test.target);
    let correct = compareArrays(test.ans, res);
    console.log(
        'expected:', test.ans,
        '| calculated:', res,
        'numbers', test.nums[res[0]], 'and', test.nums[res[1]], 'sum', test.nums[res[0] - 1] + test.nums[res[1] - 1],
        'target', test.target,
        '| result is', correct ? 'CORRECT' : 'WRONG!'
    );
});

function compareArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) return false;
    }
    return true;
}
