/*
Custom object with prototype functions and this binding
Analog of a class in object-oriented languages
 */

/**
 * @param {number[][]} rectangle
 */
let SubrectangleQueries = function(rectangle) {
    this.data = rectangle;
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @param {number} newValue
 * @return {void}
 */
SubrectangleQueries.prototype.updateSubrectangle = function(row1, col1, row2, col2, newValue) {
    for (let row = row1; row <= row2; row++) {
        for (let col = col1; col <= col2; col++) {
            this.data[row][col] = newValue;
        }
    }
};

/**
 * @param {number} row
 * @param {number} col
 * @return {number}
 */
SubrectangleQueries.prototype.getValue = function(row, col) {
    return this.data[row][col];
};

/**
 * Your SubrectangleQueries object will be instantiated and called as such:
 * var obj = new SubrectangleQueries(rectangle)
 * obj.updateSubrectangle(row1,col1,row2,col2,newValue)
 * var param_2 = obj.getValue(row,col)
 */

const tests = [
    {
        inputs: [
            ["SubrectangleQueries","getValue","updateSubrectangle","getValue","getValue","updateSubrectangle","getValue","getValue"],
            [[[1,2,1],[4,3,4],[3,2,1],[1,1,1]],[0,2],[0,0,3,2,5],[0,2],[3,1],[3,0,3,2,10],[3,1],[0,2]]
        ],
        outputs: [null,1,null,5,5,null,10,5]
    },
    {
        inputs: [
            ["SubrectangleQueries","getValue","updateSubrectangle","getValue","getValue","updateSubrectangle","getValue"],
            [[[1,1,1],[2,2,2],[3,3,3]],[0,0],[0,0,2,2,100],[0,0],[2,2],[1,1,2,2,20],[2,2]]
        ],
        outputs: [null,1,null,100,100,null,20]
    }
];

for (let test of tests) {
    const executor = new SubrectangleQueries(test.inputs[1][0]);
    for (let i = 1; i < test.inputs[0].length; i++) {
        let output = executor[test.inputs[0][i]](...test.inputs[1][i]);
        const success = typeof output !== 'undefined' ? output === test.outputs[i] : true;
        console.log(`Test ${i}: ${success ? 'SUCCESS' : 'FAILURE'}. Expected ${test.outputs[i]} to equal ${output}`);
    }
}
console.log('all done');
