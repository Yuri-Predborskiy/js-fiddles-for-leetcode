/*
Build an order of courses so that we can take each prerequisite course before taking desired course
In other words, perform topological sort

Solution using DFS-based topological sort
First, create nodes and connect them to each other (parent, child connections)
Then, find nodes that have no parents and add them to stack
When processing a node with no parent nodes (or where all parents are already processed),
    increment count of processed parents to each child
If a child has all of its parents processed, add that child to stack
When processing a node, add its name to output

Duplicates and loops are eliminated by design here - we cannot revisit same nodes
    because we cannot enter a loop by design - we only add a node to stack if it has no incoming connections
This means we cannot add nodes in loops to stack at all

If number of nodes in output matches number of courses, we are done, return order
If there is no match and stack is empty, return empty array

Time complexity: O(n), we go over inputs once at a time
Space complexity: O(n + d), we need to create a graph node out of every course, and build connections
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
let findOrder = function(numCourses, prerequisites) {
    function GraphNode(name) {
        this.name = name;
        this.parents = [];
        this.children = [];
        this.parentsProcessed = 0;
    }

    const courses = [];
    for (let i = 0; i < numCourses; i++) {
        courses.push(new GraphNode(i));
    }
    for (let [child, parent] of prerequisites) {
        courses[parent].children.push(child);
        courses[child].parents.push(parent);
    }

    const stack = [];
    for (let course of courses) {
        if (course.parents.length === 0) {
            stack.push(course);
        }
    }

    const output = [];
    while (stack.length > 0) {
        const course = stack.pop();
        if (course.parentsProcessed === course.parents.length) {
            for (let child of course.children) {
                courses[child].parentsProcessed++;
                if (courses[child].parentsProcessed === courses[child].parents.length) {
                    stack.push(courses[child]);
                }
            }
            output.push(course.name);
        }
    }

    return output.length === numCourses ? output : [];
};

let tests = [
    {params: [2, [[1,0]]], ans: [[0,1]]},
    {params: [4, [[1,0],[2,0],[3,1],[3,2]]], ans: [[0,1,2,3], [0,2,1,3]]},
    {params: [2, [[1,0],[0,1]]], ans: [[]]}, // loop
];

function isOneOfCollection(array, collection) {
    for (let targetArray of collection) {
        if (compareArraysStrict (targetArray, array)) {
            return true;
        }
    }
    return false;
}

tests.forEach(test => {
    let res = findOrder(...test.params);
    let correct = isOneOfCollection(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
