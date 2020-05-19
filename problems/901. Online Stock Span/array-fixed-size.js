/*
Using array of a fixed size and operation counter.
Insert at operation number (initial index)
Check item at operation (initial index when calling next).
Use counts to jump over items.

Time complexity: O(n) wost case, but can skip over items
Space complexity: O(2n) = O(n), keep extra data per item
 */

let StockSpanner = function() {
    this.prices = new Array(10001);
    this.operations = 0;
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {
    let count = 1;
    let index = this.operations - count;
    while (index >= 0) {
        if (this.prices[index].price <= price) {
            let temp = this.prices[index];
            count += temp.count;
            index -= temp.count;
        } else {
            break;
        }
    }
    this.prices[this.operations] = {count, price};
    this.operations++;
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
