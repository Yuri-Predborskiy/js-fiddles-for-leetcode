// Traversing trees using recursion vs iterative approach (stack)
let {TreeNode} = require('../helper');

// array 1 - create a string, break it into characters, swap 'x' for null
// array 2 - pure simple array
let arr1 = 'a,b,d,h,x,x,i,x,x,e,x,k,x,x,c,f,x,x,g'.split(',');
arr1 = arr1.map(item => item === 'x' ? null : item);
let arr2 = [1, null, 2, 3];

// creating a tree using recursion
function transformArrayToTreeRecursively(array) {
    let index = 0;
    function calc() {
        if (index >= array.length || array[index] === null) {
            index++;
            return;
        }
        let root = new TreeNode(array[index++]);
        let branches = ['left', 'right'];
        for (let branch of branches) {
            let temp = calc(array);
            if (temp) root[branch] = temp;
        }
        return root;
    }
    return calc(array);
}

let recursive1 = transformArrayToTreeRecursively(arr1);
let recursive2 = transformArrayToTreeRecursively(arr2);

// creating a tree using iterative approach
// this is a simple imitation of a call stack but it allows you to see stack and has no limit on number of calls
function transformArrayToTreeIteratively(array) {
    function addBranch(root, branch) {
        if (index >= array.length) return;
        stack.push({root, branch});
    }

    if (!array.length) return null;

    let tree = new TreeNode(array[0]), index = 0, stack = [];
    // stack (LIFO) requires right branch to be added first, left to be last (left is processed first, then right)
    addBranch(tree, 'right');
    addBranch(tree, 'left');

    while (stack.length && ++index < array.length) {
        let {root, branch} = stack.pop();
        if (array[index] === null) continue;
        root[branch] = new TreeNode(array[index]);
        addBranch(root[branch], 'right');
        addBranch(root[branch], 'left');
    }
    return tree;
}

let iterative1 = transformArrayToTreeIteratively(arr1);
let iterative2 = transformArrayToTreeIteratively(arr2);

console.log('done'); // anchor point for debugging and comparing results
