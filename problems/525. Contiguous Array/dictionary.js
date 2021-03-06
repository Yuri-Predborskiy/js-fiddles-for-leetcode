/*
Solution taken from LeetCode solutions page. Explanation is my own.

Idea: we want to find a sub-array (length) where the number of 0s and 1s is equal
We can do this by counting number of 0s and 1s and then making a map (hashmap, dictionary) of counts at every index
When we encounter an index we have seen before,
 it means we are at a point where number of 0s and 1s are equal,
 plus extra numbers before the point of equilibrium.
Meaning, if we ignore the extra points, we have a sub-array where number of 0s and 1s are equal

Example:
[0, 0, 0, 1, 1, 0, 0, 0, 0]
If we count "0"s as -1 and "1"s as 1, we will have the following counts
0: -1, 1: -2, 2: -3, 3: -2, 4: -1, 5: -2, 6: -3, 7: -4, 8: -5
As we can see, we have -2 appear twice, at indexes 1 and 3
This means that if we remove everything from the start till index 1, we will have equal number of 1s and 0s (zero of either)
At the same time, at index 3 we will have the same sum of 0s and 1s (1 of each)
This means that between indexes 1 and 3 we have a length of 3-1 = 2 items with equal number of 0s and 1s (one of each)

Looking further we see that count -1 is seen twice: at indexes 0 and 4
This means if we ignore everything before index 0 (inclusive) and ignore the rest of the array after index 4 (exclusive),
 our sub-array will have equal number of 0s and 1s
In other words, between indexes 0 and 4 we have a length of 4-0 = 4 items with equal number of 0s and 1s (two of each)
This result is larger than the previous result, so it is our new max

In other words: any two points where the count of 0s and 1s match a previous point is a contiguous sub-array
 with balanced number of 0s and 1s.

Hopefully this explanation is clear.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
let findMaxLength = function(nums) {
    let max = 0, count = 0;
    const dict = new Map();
    dict.set(0, -1); // edge case when the array is balanced from the very start, then max is index + 1 (or -(-1))
    for (let i = 0; i < nums.length; i++) {
        count += nums[i] === 1 ? 1 : -1;
        if (dict.has(count)) {
            max = Math.max(max, i - dict.get(count));
        } else {
            dict.set(count, i);
        }
    }

    return max;
};

let tests = [
    {
        params: [[0,1]],
        ans: 2,
    },
    {
        params: [[0,0,1]],
        ans: 2,
    },
    {
        params: [[0,1,0]],
        ans: 2,
    },
    {
        params: [[0,0,0,1,1,1,0]],
        ans: 6,
    },
];

tests.forEach(test => {
    let res = findMaxLength(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
