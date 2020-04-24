// Least Recently Used cache using map
// get time complexity: O(1)
// put time complexity: O(n) (iterate over all items to find least recently used item)

/**
 * @param {number} capacity
 */
let LRUCache = function(capacity) {
    this.map = new Map();
    this.length = 0;
    this.maxLength = capacity;
    this.counter = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) {
        return -1;
    }
    let item = this.map.get(key);
    item.operation = this.counter++;
    this.map.set(key, item);
    return item.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (!this.map.has(key)) {
        this.length++;
    }
    if(this.length > this.maxLength) {
        let min = Infinity, leastRecentlyUsedItem;
        for (let [key, value] of this.map) {
            if (value.operation < min) {
                min = value.operation;
                leastRecentlyUsedItem = key;
            }
        }
        this.map.delete(leastRecentlyUsedItem);
        this.length--;
    }
    this.map.set(key, {operation: this.counter++, value});
};

LRUCache.prototype.getAll = function() {
    for (let item of this.map) {
        console.log('item is', item);
    }
};
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// let tests = [[1, 10], [2, 20], [3, 30], [4, 40]];
// const cache = new LRUCache(2);
// console.log('value', cache.get(tests[0][0]),'should be -1, not defined yet');
// cache.put(...tests[0]);
// cache.put(...tests[1]);
// console.log('value', cache.get(tests[0][0]), 'should be', tests[0][1]);
// cache.put(...tests[2]);
// console.log('value', cache.get(tests[1][0]), 'should be -1, deleted already');
// cache.put(...tests[3]);
// console.log('value', cache.get(tests[0][0]), 'should be -1, deleted already');
// console.log('value', cache.get(tests[2][0]), 'should be', tests[2][1]);
// console.log('value', cache.get(tests[3][0]), 'should be', tests[3][1]);
// console.log('done');

// ["LRUCache","get","put","get","put","put","get","get"]
//     [[2],   [2],   [2,6],[1], [1,5],[1,2],[1],  [2]]
//     [null,   -1,   null ,-1 ,  null, null, 2,    6]
// let tests = [[2, 6], [1, 5], [1, 2]];
// const cache = new LRUCache(2);
// console.log('value', cache.get(tests[0][0]),'should be -1, not defined yet');
// cache.put(...tests[0]);
// console.log('value', cache.get(tests[1][0]), 'should be -1, not defined yet');
// cache.put(...tests[1]);
// cache.put(...tests[2]);
// console.log('value', cache.get(tests[2][0]), 'should be', tests[2][1]);
// console.log('value', cache.get(tests[0][0]), 'should be', tests[0][1]);
// console.log('done');

const inputs = [
    [
        "LRUCache","put","put","put","put","put","get","put","get","get",
        "put","get","put","put","put","get","put","get","get","get",
        "get","put","put","get","get","get","put","put","get","put",
        "get","put","get","get","get","put","put","put","get","put",
        "get","get","put","put","get","put","put","put","put","get",
        "put","put","get","put","put","get","put","put","put","put",
        "put","get","put","put","get","put","get","get","get","put",
        "get","get","put","put","put","put","get","put","put","put",
        "put","get","get","get","put","put","put","get","put","put",
        "put","get","put","put","put","get","get","get","put","put",
        "put","put","get","put","put","put","put","put","put","put"
    ],
    [
        [10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],
        [5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],
        [9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],
        [8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],
        [8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],
        [9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],
        [9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],
        [1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],
        [3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],
        [3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],
        [5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]
    ]
];
const outputs = [
    null,null,null,null,null,null,-1,null,19,17,
    null,-1,null,null,null,-1,null,-1,5,-1,
    12,null,null,3,5,5,null,null,1,null,
    -1,null,30,5,30,null,null,null,-1,null, // expected
    -1,24,null,null,18,null,null,null,null,-1,null,null,18,null,
    null,-1,null,null,null,null,null,18,null,null,-1,null,4,29,30,null,12,-1,null,null,null,null,29,null,null,null,null,
    17,22,18,null,null,null,-1,null,null,null,20,null,null,null,-1,18,18,null,null,null,null,20,null,null,null,null,null,
    null,null];
const errory = [
    null,null,null,null,null,null,-1,null,19,17,
    null,-1,null,null,null,-1,null,-1,5,-1,
    12,null,null,3,5,5,null,null,1,null,
    -1,null,-1,5,30,null,null,null,-1,null, // error here - second -1 should have been 30, operation 33
    -1,24,null,null,18,null,null,null,null,-1,
    null,null,18,null,null,-1,null,null,null,null,
    null,-1,null,null,-1,null,4,29,-1,null,
    12,-1,null,null,null,null,29,null,null,null,
    null,17,-1,-1,null,null,null,-1,null,null,
    null,-1,null,null,null,-1,-1,-1,null,null,
    null,null,-1,null,null,null,null,null,null,null
];

const test = new LRUCache(inputs[1][0]);
for (let i = 1; i < inputs[0].length; i++) {
    // console.log(`performing operation index ${i} type "${inputs[0][i]}" using inputs ${inputs[1][i]}`);
    let output = test[inputs[0][i]](...inputs[1][i]);
    if (output && output !== outputs[i]) {
        test.getAll();
        console.log(`output mismatch at ${i}, expected ${outputs[i]} to equal ${output}`);
    }
}
console.log('all done');
