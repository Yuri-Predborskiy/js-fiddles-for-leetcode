/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
let canVisitAllRooms = function(rooms) {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    function Queue() {
        this.head = this.tail = null;
    }
    Queue.prototype.enqueue = function(val) {
        if (this.isEmpty()) {
            this.head = this.tail = new ListNode(val);
        } else {
            this.tail.next = new ListNode(val);
            this.tail = this.tail.next;
        }
    };
    Queue.prototype.dequeue = function() {
        if (this.isEmpty()) {
            return null;
        }
        let val = this.head.val;
        this.head = this.head.next;
        return val;
    };
    Queue.prototype.isEmpty = function() {
        return this.head === null;
    };

    function visitRoom(roomNumber) {
        if (visited.has(roomNumber)) {
            return;
        }
        visited.add(roomNumber);
        let keys = rooms[roomNumber];
        for (let i = 0; i < keys.length; i++) {
            queue.enqueue(keys[i]);
        }
    }

    let visited = new Set(), queue = new Queue();
    visitRoom(0);
    while (!queue.isEmpty()) {
        visitRoom(queue.dequeue());
    }

    return rooms.length === visited.size;
};

let tests = [
    {
        params: [[[1],[2],[3],[]]],
        ans: true,
    },
    {
        params: [[[1,3],[3,0,1],[2],[0]]],
        ans: false,
    }
];

tests.forEach(test => {
    let res = canVisitAllRooms(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
