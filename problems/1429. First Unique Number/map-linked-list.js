/*
Queue that can show first unique number
initialize time: O(n)
add time: O(1)
showFirstUnique time: O(1)
Extra space complexity: O(n) (every item requires 3 records: queue, doubly linked list and map)

Idea:
Queue is implemented as array
Doubly linked list that contains unique number values in order of addition
Map of unique numbers where key = unique number, value = list node

Initialize - create doubly linked list, map, add each number in the inputs using "add" function

Add number - check if this number exists in Map (O(1) time complexity).
    If number exists in Map,
        get node from Map (O(1))
        remove node from doubly linked list (O(1))
        delete record from Map (O(1))
        This will also update the head of the linked list if number was first unique number
    If number does not exist in Map,
        add new number at tail of Doubly Linked List and return node
        update map to add key: new number, value: node
        This will also update the tail of the linked list

Show first Unique number - get head from doubly linked list
 */

const ListNode = function(value) {
    this.value = value;
    this.next = this.prev = null;
};

const DoublyLinkedList = function() {
    this.head = this.tail = null;
};

DoublyLinkedList.prototype.addAtTail = function(value) {
    const node = new ListNode(value);
    if (this.tail) {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    } else { // there is no tail. This is possible only if linked list is empty
        this.tail = this.head = node;
    }
    return node;
};

DoublyLinkedList.prototype.remove = function(node) {
    if (node.prev) {
        node.prev.next = node.next;
    }
    if (node.next) {
        node.next.prev = node.prev;
    }
    if (this.head === node) {
        this.head = node.next;
    }
    if (this.tail === node) {
        this.tail = node.prev;
    }
};

DoublyLinkedList.prototype.getAtHead = function() {
    return this.head;
};

/**
 * @param {number[]} nums
 */
let FirstUnique = function(nums) {
    this.queue = [];
    this.map = new Map();
    this.list = new DoublyLinkedList();
    for (let num of nums) {
        this.add(num);
    }
};

/**
 * @return {number}
 */
FirstUnique.prototype.showFirstUnique = function() {
    const node = this.list.getAtHead();
    if (node) {
        return node.value;
    }
    return -1;
};

/**
 * @param {number} value
 * @return {void}
 */
FirstUnique.prototype.add = function(value) {
    this.queue.push(value);
    // if item exists and is unique - remove from unique
    if (this.map.has(value)) {
        const item = this.map.get(value);
        if (item.unique) {
            this.list.remove(item.node);
            item.unique = false;
        }
    } else { // new unique item - add at the end of queue
        const item = {
            unique: true,
            node: this.list.addAtTail(value),
        };
        this.map.set(value, item);
    }
};

/**
 * Your FirstUnique object will be instantiated and called as such:
 * var obj = new FirstUnique(nums)
 * var param_1 = obj.showFirstUnique()
 * obj.add(value)
 */

const tests = [
    {
        inputs: [
            ["FirstUnique","showFirstUnique","add","showFirstUnique","add","showFirstUnique","add","showFirstUnique"],
            [[[2,3,5]],[],[5],[],[2],[],[3],[]]
        ],
        outputs: [null,2,null,2,null,3,null,-1],
    },
    {
        inputs: [
            ["FirstUnique","showFirstUnique","add","showFirstUnique"],
            [[[809]],[],[809],[]]
        ],
        outputs: [null,809,null,-1],
    },
];

for (let test of tests) {
    const executor = new FirstUnique(...test.inputs[1][0]);
    for (let i = 1; i < test.inputs[0].length; i++) {
        let output = executor[test.inputs[0][i]](...test.inputs[1][i]);
        const success = output ? output === test.outputs[i] : true;
        console.log(`Test ${i}: ${success ? 'SUCCESS' : 'FAILURE'}. Expected ${test.outputs[i]} to equal ${output}`);
    }

}
console.log('all done');
