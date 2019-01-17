console.log("Hello world! All fiddles are in their respective folders");
// todo: create a test suite that would run all the applications and output results of testing each individual file

// tree parsing using recursive approach
let {TreeNode} = require('./problems/helper');

function calc(array) {
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
let index = 0;

let arr1 = 'a,b,d,h,x,x,i,x,x,e,x,k,x,x,c,f,x,x,g'.split(',');
arr1 = arr1.map(item => item === 'x' ? null : item);
let arr2 = [1, null, 2, 3];

let test = calc(arr1);
let test2 = calc(arr2);

// todo implement tree parsing via using iterative approach

console.log('done');