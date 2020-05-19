/*
Using stack
When inserting an item, pop previous smaller items, save new item with increased counter
Precise old data is not used

The main drawback of recommending using a stack is that in JS stack is slower than array of fixed size.
The primary benefit is the fact we save space in the stack by not keeping older items that would be skipped over.

Time complexity: O(n) wost case, but can skip over items
Space complexity: O(2n) = O(n) worst case, but we remove "duplicate" records (smaller than current)
 */

let StockSpanner = function() {
    this.prices = [];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function(price) {
    let count = 1;
    let index = this.prices.length - count;
    while (this.prices.length > 0 && index >= 0) {
        if (this.prices[index].price <= price) {
            let temp = this.prices.pop();
            count += temp.count;
            index--;
        } else {
            break;
        }
    }
    this.prices.push({count, price});
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
