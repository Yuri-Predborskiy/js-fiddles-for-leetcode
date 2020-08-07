/*
Calculate number of CPU cycles required to execute all tasks considering pause (n)
    between executing same type of task

Linear solution using counting idle slots in the largest task group
Firstly, calculate the biggest group and number of times the biggest group is found
Then calculate the number of idle slots per task group
A task group is a task with most repeats, separated by "CPU idle" commands,
    minus one repeat since last executed command does not require idle time
Then calculate the number of empty idle slots in groups
    Number of idle groups is most repeated task - 1
    Number of idle slot size per group is n - (number of biggest group repeats - 1)
    Number of unfilled idle slots is number of idle groups * idle slot size
Then calculate the number of tasks we can use to fill empty slots
    available tasks = all tasks - used tasks (max group size * max group repeats)
Then fill all available empty slots with tasks: empty slots - available tasks
If the number of remaining CPU idle slots is less than 0, idling is not required, so set it to 0.
Our result is number of idle slots + number of tasks
In the best case scenario result = number of tasks

Optimizations:
Since all tasks are one of 26 types, we can use 26 unique elements as group types (task name)
This allows us to use fixed size of the array (26), which allows for constant space complexity

Time complexity: O(n)
Space complexity: O(1)
Solution inspired by the following discussion that contains detailed explanation of all possible scenarios:
https://leetcode.com/problems/task-scheduler/discuss/104500/
 */

/**
 * @param {string[]} tasks
 * @param {number} n
 * @return {number}
 */
let leastInterval = function(tasks, n) {
    const firstChar = 'A'.charCodeAt(0);
    const groups = new Array(26).fill(0);
    let max = 0;
    let maxCount = 0;
    for (let task of tasks) {
        const taskIndex = task.charCodeAt(0) - firstChar;
        groups[taskIndex]++;
        if (groups[taskIndex] === max) {
            maxCount++;
        } else if (groups[taskIndex] > max) {
            max = groups[taskIndex];
            maxCount = 1;
        }
    }

    const idleSlots = max - 1;
    const slotSize = n - (maxCount - 1);
    const emptySlots = idleSlots * slotSize;
    const availableTasks = tasks.length - max * maxCount;
    const idles = Math.max(0, emptySlots - availableTasks);

    return tasks.length + idles;
};

let tests = [
    {params: [['A','A','A','B','B','B'], 2], ans: 8},
    {params: [["A","A","A","B","B","B"], 0], ans: 6},
    {params: [["A","A","A","A","A","A","B","C","D","E","F","G"], 2], ans: 16},
];

tests.forEach(test => {
    let res = leastInterval(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
