/*
Brute force algorithm.
Save all the data, count data when requested.
Slow but fast enough not to get TLE.

Time complexity: O(n), does not skip over items
Space complexity: O(n), no extra data per element
 */

let StockSpanner = function() {
    this.prices = [];
    this.index = -1;
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {
    this.prices.push(price);
    let count = 1;
    for (let i = this.prices.length - 2; i >= 0; i--) {
        if (this.prices[i] > price) {
            return count;
        }
        count++;
    }
    return count;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

const tests = [
    {
        inputs: [
            ["StockSpanner","next","next","next","next","next","next","next"],
            [[],[100],[80],[60],[70],[60],[75],[85]]
        ],
        outputs: [null,1,1,1,2,1,4,6]
    },
];

let fails = 0;
for (let test of tests) {
    const executor = new StockSpanner(...test.inputs[1][0]);
    for (let i = 1; i < test.inputs[0].length; i++) {
        let output = executor[test.inputs[0][i]](...test.inputs[1][i]);
        const success = output ? output === test.outputs[i] : true;
        if (!success) {
            fails++;
        }
        console.log(`Test ${i}: ${success ? 'SUCCESS' : 'FAILURE'}. Expected ${test.outputs[i]} to equal ${output}`);
    }
}

console.log(fails ? `There were ${fails} failed tests` : 'all done');
