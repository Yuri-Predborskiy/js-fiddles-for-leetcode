/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
let convert = function(s, numRows) {
    function processColumn(index) {
        for (let i = 0; i < numRows; i++) {
            graph[i].push(s[index++]);
            if (index >= s.length) return index;
        }
        return index;
    }

    function processDiagonal(index) {
        for (let i = numRows - 2; i > 0; i--) {
            graph[i].push(s[index++]);
            if (index >= s.length) return index;
        }
        return index;
    }

    const graph = [];
    for (let i = 0; i < numRows; i++) {
        graph.push([]);
    }

    let diagonal = false, lastIndex = 0;
    while (lastIndex < s.length) {
        if (diagonal) lastIndex = processDiagonal(lastIndex);
        else lastIndex = processColumn(lastIndex);
        diagonal = !diagonal;
    }

    return graph.reduce((acc, row) => {
        acc.push(...row);
        return acc;
    }, []).join('');
};

let tests = [
    {
        params: ['PAYPALISHIRING', 3],
        ans: 'PAHNAPLSIIGYIR',
    },
    {
        params: ['PAYPALISHIRING', 4],
        ans: 'PINALSIGYAHRPI',
    },
];

tests.forEach(test => {
    let res = convert(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
