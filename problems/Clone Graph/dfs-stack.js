const {UndirectedGraphNode} = require('../helper');

/**
 * @param {UndirectedGraphNode} graph
 * @return {UndirectedGraphNode}
 */
let cloneGraph = function(graph) {
    if (!graph) return null;
    let copy = new UndirectedGraphNode(graph.label);
    let copyNodes = new Map(); // map that contains original nodes and their copies
    copyNodes.set(graph, copy);
    let stack = [graph];
    while (stack.length > 0) {
        let nextNode = stack.pop();
        for (let i = 0; i < nextNode.neighbors.length; i++) {
            let neighborOriginal = nextNode.neighbors[i];
            if (copyNodes.has(neighborOriginal)) {
                let nextNodeCopy = copyNodes.get(nextNode);
                nextNodeCopy.neighbors.push(copyNodes.get(neighborOriginal));
            } else {
                // create a new neighbor node
                let neighborCopy = new UndirectedGraphNode(neighborOriginal.label);
                // add copy neighbor node to dictionary
                copyNodes.set(neighborOriginal, neighborCopy);
                // nextNode is one of the original nodes, nextNodeCopy is a copy of that node
                // get a copy of the original node
                let nextNodeCopy = copyNodes.get(nextNode);
                // attach neighbor copy to node's copy neighbors
                nextNodeCopy.neighbors.push(neighborCopy);
                // process this node's neighbors (add this new node to stack)
                stack.push(neighborOriginal);
            }
        }
    }

    return copy;
};

let node = new UndirectedGraphNode('0');
node.neighbors.push(node);
node.neighbors.push(node);
cloneGraph(node);

// testing only works in debug mode
// in order to run proper tests you need to make a serializer that writes down the node label and neighbor labels
// (but not neighbor's neighbor labels!)

// todo: implement tests

// tests.forEach(test => {
//     let res = numIslands(...test.params);
//     let correct = res === test.ans;
//     console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
// });
