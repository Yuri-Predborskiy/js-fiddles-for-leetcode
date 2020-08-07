/*
Given an array where all numbers repeat exactly one, find two numbers that do not repeat
Do it in linear time while using constant space

Bitwise solution
Since every duplicate number repeats exactly twice, we can calculate the number by using XOR
Since there are two individual numbers we need to calculate, we first need to split
    all the numbers into two groups - one that contains set bit, and one that does not
Set bit - a bit that is set in only one of the two numbers
This approach allows us to treat input array as two arrays, each containing duplicate numbers
    with one unique number
Which, in turn, allows us to use XOR on all of the numbers in the respective group
    to find that one unique number
How XOR works: since every repeating number happens exactly twice, we can use XOR
    to negate the two numbers (a ^ a === 0), unique number will be the one remaining
Splitting into groups is performed by selecting any bit that is set in one number and
    not set in another number
Each group will contain one unique number and any number of duplicates

Time complexity: O(n), we go over the array once
Space complexity: O(1)
Idea inspired by wonderful explanation by zhiqing_xiao
https://leetcode.com/problems/single-number-iii/discuss/68900/
 */

const {compareArrays} = require('../helper');

/**
 * @param {number[]} nums
 * @return {number[]}
 */
let singleNumber = function(nums) {
    let diff = 0;
    for (let num of nums) {
        diff ^= num;
    }
    diff &= -diff;
    let first = 0, second = 0;
    for (let num of nums) {
        if (num & diff) {
            first ^= num;
        } else {
            second ^= num;
        }
    }

    return [first, second];
};

let tests = [
    {params: [[1,2,1,3,2,5]], ans: [3,5]},
    {params: [[1,2,1,3,3,2,5,6]], ans: [6,5]},
    {params: [[1,2]], ans: [1,2]},
];

tests.forEach(test => {
    let res = singleNumber(...test.params);
    let correct = compareArrays(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
