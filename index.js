console.log("Hello world! All fiddles are in their respective folders");
// todo: create a test suite that would run all the applications and output results of testing each individual file

// tree parsing using recursive approach
let {TreeNode} = require('./problems/helper');

function transformArrayToTree(array) {
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

let arr1 = 'a,b,d,h,x,x,i,x,x,e,x,k,x,x,c,f,x,x,g'.split(',');
arr1 = arr1.map(item => item === 'x' ? null : item);
let arr2 = [1, null, 2, 3];

let recursive1 = transformArrayToTree(arr1);
let recursive2 = transformArrayToTree(arr2);

function transform(array) {
    function addBranch(root, branch) {
        if (index >= array.length) return;
        stack.push({root, branch});
    }

    if (!array.length) return null;

    let tree = new TreeNode(array[0]), index = 0, stack = [];
    // for LIFO / stack and binary tree, right branch goes first
    addBranch(tree, 'right');
    addBranch(tree, 'left');
    // for FIFO and binary tree, left branch should go first

    while (stack.length && ++index < array.length) {
        let {root, branch} = stack.pop();
        if (array[index] === null) continue;
        root[branch] = new TreeNode(array[index]);
        addBranch(root[branch], 'right');
        addBranch(root[branch], 'left');
    }
    return tree;
}

let iterative1 = transform(arr1);
let iterative2 = transform(arr2);
// todo implement tree parsing via using iterative approach

console.log('done');