/*
Calculate angle between the hands of the clock

Math solution
Every minute on the clock is 6 degrees for minute hand
Calculation: 360 degrees total / 60 minutes total = 6 degrees per minute
Every hour on the clock is 30 degrees for hour hand
Calculation: 360 degrees total / 12 hours total = 30 degrees per hour
But minute hand also affects hour hand - it adds 0.5 degrees per minute to hour hand
Calculation: 30 degrees total in one hour / 60 minutes total in one hour = 0.5 degrees extra for hour hand per minute
Calculate hour and minute angles
Return bigger - smaller.

Special hidden condition:
If result is larger than 180, return 360 - result (angle should be smaller than 180 degrees)

Time complexity: O(1), constant
Space complexity: O(1), constant
 */

/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
let angleClock = function(hour, minutes) {
    const minuteAngle = minutes * 6;
    const hourAngle = (hour % 12) * 30 + minutes * 0.5;
    const result = Math.max(minuteAngle, hourAngle) - Math.min(minuteAngle, hourAngle);
    return result <= 180 ? result : 360 - result;
};

const tests = [
    {params: [12,30], ans: 165.00000},
    {params: [3,30], ans: 75.00000},
    {params: [3,15], ans: 7.50000},
    {params: [4,50], ans: 155.00000},
    {params: [12,0], ans: 0.00000},
    {params: [1,57], ans: 76.50000},
];

for (let test of tests) {
    const res = angleClock(...test.params);
    const correct = res === test.ans;
    console.log(`expected: '${test.ans}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
}
