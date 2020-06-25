/*
Convert absolute path in unix style, simplify and convert it to canonical path.

Solution in map-reduce style
Split string into blocks
Process each block (map)
Remove or skip elements as necessary (reduce)
Join the remaining elements and add / at the start

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {string} path
 * @return {string}
 */
let simplifyPath = function(path) {
    const result = [];
    const pathArray = path.split('/');
    for (let i = 0; i < pathArray.length; i++) {
        const item = pathArray[i];
        if (item === '..') {
            result.pop();
        } else if (item && item !== '.') {
            result.push(item);
        }
    }
    return '/' + result.join('/');
};

let tests = [
    {params: ['/home/'], ans: '/home'},
    { params: ['/a//b////c/d//././/..'], ans: '/a/b/c' },
    { params: ['/a/../../b/../c//.//'], ans: '/c' },
    { params: ['/a/./b/../../c/'], ans: '/c' },
    { params: ['/home//foo/'], ans: '/home/foo' },
    { params: ['/../'], ans: '/' },
];

tests.forEach(test => {
    let res = simplifyPath(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
