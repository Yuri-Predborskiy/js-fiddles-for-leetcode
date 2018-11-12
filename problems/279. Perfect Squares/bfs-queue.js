/*
    Number of perfect squares required to add up to n
    Idea: brute force. Try to sum every possible combination of squares to see if it gives us desired number
    If the number is found, number of iterations = smallest number of squares needed to add up to target.

    Basically, this is a "brute force" approach.
 */

/**
 * @param {number} n
 * @return {number}
 */
let numSquares = function(n) {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    function Queue() {
        this.head = this.tail = null;
        this.size = 0;
    }
    Queue.prototype.push = function(val) {
        this.size++;
        if (this.isEmpty()) {
            this.head = this.tail = new ListNode(val);
        } else {
            this.tail.next = new ListNode(val);
            this.tail = this.tail.next;
        }
    };
    Queue.prototype.pop = function() {
        if (this.isEmpty()) {
            return null;
        }
        this.size--;
        let val = this.head.val;
        this.head = this.head.next;
        return val;
    };
    Queue.prototype.isEmpty = function() {
        return this.head === null;
    };
    Queue.prototype.getSize = function() {
        return this.size;
    };

    let steps = 1, numbers = new Queue(), squares = [], visited = {};
    for (let i = 1; i * i <= n; i++) {
        let square = i * i;
        if (square === n) return steps;
        squares.push(square);
        numbers.push(square);
        visited[square] = true;
    }

    while (!numbers.isEmpty()) {
        steps++;
        let length = numbers.getSize();
        for (let i = 0; i < length; i++) {
            let number = numbers.pop();
            for (let j = 0; j < squares.length; j++) {
                let sum = number + squares[j];
                if (sum === n) {
                    return steps;
                } else if (!visited[sum]) {
                    numbers.push(sum);
                    visited[sum] = true;
                } else if (sum > n) {
                    break;
                }
            }
        }
    }
    return -1;
};

let tests = [
    { params: [1], ans: 1, },
    { params: [12], ans: 3, },
    { params: [13], ans: 2, },
];

tests.forEach(test => {
    let res = numSquares(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
