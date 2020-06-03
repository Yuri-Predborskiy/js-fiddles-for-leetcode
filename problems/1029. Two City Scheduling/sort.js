/*
Calculate the smallest possible cost of flying people to city A or city B
Must fly all people. Must fly half people into each city.
Number of people is guaranteed to be even

Solution: sort by absolute difference between costs in descending order
Then solve using greedy algorithm - grab all people and fly them to A as long as cost is smaller for A
Once capacity is full, fly the rest to B
Same check with B - fly to A if B is at max capacity

Inspired by other solutions

Time complexity: O(n*log(n)) because of sorting
Space complexity: O(1)
 */

/**
 * @param {number[][]} costs
 * @return {number}
 */
let twoCitySchedCost = function(costs) {
    costs.sort((a, b) => Math.abs(b[1] - b[0]) - Math.abs(a[1] - a[0]));
    const capacity = costs.length / 2;
    let counterA = 0;
    let counterB = 0;
    let total = 0;
    for (let i = 0; i < costs.length; i++) {
        if (counterB === capacity) {
            total += costs[i][0];
        } else if (counterA === capacity) {
            total += costs[i][1];
        } else {
            if (costs[i][0] <= costs[i][1]) {
                total += costs[i][0];
                counterA++;
            } else {
                total += costs[i][1];
                counterB++;
            }
        }
    }
    return total;
};

let tests = [
    {params: [[[10,20],[30,200],[400,50],[30,20]]], ans: 110},
    {params: [[[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]], ans: 1859},
];

tests.forEach(test => {
    let res = twoCitySchedCost(...test.params);
    let correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
});
