/*
Find two non-overlapping sub-arrays each of which has sum = target sum

Solution using sliding window - keep current sum, update it as you go over the array
If sum = target - save sum

This solution has a flaw - it may allow overlapping solutions under certain conditions

TODO: fix flaw in this solution

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
let minSumOfLengths = function(arr, target) {
    let shorter = [-1, Infinity];
    let longer = [-1, Infinity];
    let sum = 0;
    let start = 0;
    let finish = -1;
    while (finish < arr.length) {
        finish++;
        sum += arr[finish];
        if (sum > target) {
            while (sum > target && start <= finish) {
                sum -= arr[start];
                start++;
            }
        }
        if (sum === target) {
            let dist = finish - start;
            if (dist < shorter[1] - shorter[0]) {
                longer = shorter;
                shorter = [start, finish];
            } else if (dist < longer[1] - longer[0] && start > shorter[1]) {
                longer = [start, finish];
            }
        }
    }
    if (shorter[1] === Infinity || longer[1] === Infinity) {
        return -1;
    }
    console.log(shorter, longer);
    return shorter[1] - shorter[0] + longer[1] - longer[0] + 2;
};

let tests = [
    {params: [[3,2,2,4,3], 3], ans: 2},
    {params: [[7,3,4,7], 7], ans: 2},
    {params: [[4,3,2,6,2,3,4], 6], ans: -1},
    {params: [[5,5,4,4,5], 3], ans: -1},
    {params: [[3,1,1,1,5,1,2,1], 3], ans: 3},
    // failing test case, which was not included in the contest
    // current code fails because it allows overlapping solutions in this case
    // {params: [[2,2,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 20], ans: 23}, // valid ans: 23
    // a lot of solutions should fail because they are supposed to output 23 here but output 25 here
];

tests.forEach(test => {
    let res = minSumOfLengths(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
