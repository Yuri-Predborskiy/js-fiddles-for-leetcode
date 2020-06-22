/*
Every number in the input array repeats exactly 3 times except for one. Find that unique number

Solution using map. Iterate over inputs, add every number into a map or increment its counter.
Once any number repeats 3 times, remove them from the map
Return the only item in the map

Time complexity: O(n)
Space complexity: O(n)
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
let singleNumber = function(nums) {
    const map = new Map();
    for (let num of nums) {
        const current = (map.get(num) || 0) + 1;
        if (current === 3) {
            map.delete(num);
        } else {
            map.set(num, current);
        }
    }
    return map.keys().next().value;
};

let tests = [
    {param: [2,2,3,2], ans: 3},
    {param: [0,1,0,1,0,1,99], ans: 99},
];

tests.forEach(test => {
    let res = singleNumber(test.param);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});

