/*
Given an acyclic graph, find all paths from source (node 0) to target (last node in array)

Solution using recursive DFS algorithm with backtracking
To solve this problem I use DFS algorithm - we visit every node and then visit every edge it has
Normally I'd create graph nodes out of input but for this problem node data structure is not mandatory
First, I visit start node (index 0 in graph), which is the first step in the path
Then I traverse every edge this node has (one of the numbers in the graph array at current index)
When visiting next edge, first I add it to current path, then visit the node
When I am done traversing the node, I remove it from path array
Adding, removing items is O(1) operation (push, pop) for JS array
Using backtracking minimizes the amount of memory I need to execute the code - I only create a copy of the array
    when I save the final path to results
Using DFS allows me to keep track of only one path at a time - current path
Since the graph is acyclic, I do not need to keep track of visited nodes (because there are no cycles)
Once we find a finish node, we copy current path into results and exit
Backtracking algorithm removes last visited node at this point and adds next edge from previous node's edge,
    if there was one that we didn't visit yet

Time complexity: O(n*d) where n - number of nodes, d - number of edges, we visit every node and every edge
Space complexity: O(n*d) we save every node that leads to the finish as many times as there are paths
 */

const {compareMatrices} = require('../helper');

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
let allPathsSourceTarget = function(graph) {
    function traverse(index) {
        if (index === finish) {
            results.push(path.slice());
            return;
        }

        const edges = graph[index];
        for (let i = 0; i < edges.length; i++) {
            path.push(edges[i]);
            traverse(edges[i]);
            path.pop();
        }
    }
    const finish = graph.length - 1;
    const path = [0];
    const results = [];
    traverse(0);
    return results;
};

let tests = [
    {params: [[[1,2], [3], [3], []]], ans: [[0,1,3],[0,2,3]]},
];

tests.forEach(test => {
    let res = allPathsSourceTarget(...test.params);
    let correct = compareMatrices(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
