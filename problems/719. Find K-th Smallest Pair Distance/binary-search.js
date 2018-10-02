/*
    Binary search
    instead of searching all the possible distances, search for the smallest number of pairs that fit criteria
    Explanation:
    First, sort the array. Then... make a guess! Anywhere between 0 and max value (we take middle for simplicity).
    Check if guessed distance fits our condition (there are no less than k pairs with guessed distance).
    If our guess is right, try a smaller distance. If our guess is wrong, try longer distance.
    At some point our guesses will meet (the value is neither smaller nor larger than our guess).
    Return at this point.

    Time complexity: O(n*log(n)) approximated
    Space complexity: O(1), we use fixed amount of memory
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
let smallestDistancePair = function(nums, k) {
    function countPairsSmallerOrEqual(distance) {
        let left = 0, count = 0;
        for (let right = 0; right < nums.length; ++right) {
            while (nums[right] - nums[left] > distance) { ++left; }
            count += right - left; // exact numbers are not required, just the number of items
            if (count > k) return count; // early exit
        }
        return count;
    }

    let max = 0;
    nums.sort((a, b) => {
        max = Math.max(b, max);
        return a - b;
    }); // also finds max value

    let left = 0, right = max;
    while (left < right) {
        let mid = Math.floor((left + right) / 2); // mid = distance
        let pairs = countPairsSmallerOrEqual(mid);
        if (pairs < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
};

let tests = [
    { nums: [1,3,1], k: 1, ans: 0 },
    { nums: [2,3,3,5,7], k: 1, ans: 0 },
    { nums: [2,3,3,5,7], k: 2, ans: 1 },
    { nums: [2,3,3,5,7], k: 3, ans: 1 },
    { nums: [2,3,3,5,7], k: 4, ans: 2 },
];

tests.forEach(test => {
    let res = smallestDistancePair(test.nums, test.k);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', res === test.ans ? 'CORRECT' : 'WRONG!');
});
