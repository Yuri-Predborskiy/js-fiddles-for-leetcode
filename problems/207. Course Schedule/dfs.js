/*
Check if every course can be completed
Meaning, there is no cycles in the graph, graph is Directed Acyclic Graph, DAG for short

Create graph node map, set up their connections and incoming connection counts
Map key - node index, value - {incoming: counter, children: [node id, node id]} (object)
Process all connections - for each outgoing connection, add number of incoming connections
Find nodes that have no incoming connections
After creating nodes, iterate over them and look for nodes with 0 incoming connections
When finding such nodes, add their children to stack
Run DFS: for each item in stack, decrement number of incoming edges by 1.
If number of incoming edges becomes 0, add node children to stack, add node to visited nodes
Once DFS is finished, compare number of visited nodes to number of all nodes
If numbers are the same, graph is DAG, return true
If number of nodes is larger than visited nodes, there is a cycle, return false

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
let canFinish = function(numCourses, prerequisites) {
    if (prerequisites.length < 2) {
        return true;
    }

    const courses = new Map();
    for (let i = 0; i < numCourses; i++) {
        courses.set(i, {incoming: 0, children: []});
    }

    for (let [childId, parentId] of prerequisites) {
        courses.get(parentId).children.push(childId);
        courses.get(childId).incoming++;
    }

    const stack = [];
    for (let [id, course] of courses.entries()) {
        if (course.incoming === 0) {
            stack.push(id);
        }
    }

    const visited = new Set();
    while (stack.length > 0) {
        const id = stack.pop();
        const course = courses.get(id);
        course.incoming--;
        if (course.incoming <= 0) {
            visited.add(id);
            for (let child of course.children) {
                stack.push(child);
            }
        }
    }

    return visited.size === courses.size;
};

let tests = [
    {params: [2, [[1,0]]], ans: true},
    {params: [2, [[1,0],[0,1]]], ans: false},
    {params: [3, [[1,0],[2,0]]], ans: true},
];

tests.forEach(test => {
    let res = canFinish(...test.params);
    let correct = test.ans === res;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
