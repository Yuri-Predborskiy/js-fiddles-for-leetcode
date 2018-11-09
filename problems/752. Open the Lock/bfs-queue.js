/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
let openLock = function(deadends, target) {
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

    function calculateNextCombo(combo, index, shift) {
        let next = combo.split('');
        next[index] = (Number.parseInt(next[index]) + shift) % 10;
        return next.join('');
    }

    function isThisTarget(next) {
        if (next === target) {
            return true;
        }
        if(!tried.has(next)) {
            tried.add(next);
            combos.push(next);
        }
        return false;
    }

    let steps = 0, combos = new Queue(), tried = new Set(deadends);

    if (!tried.has('0000')) combos.push('0000');
    while (!combos.isEmpty()) {
        steps++;
        let length = combos.getSize();
        for (let i = 0; i < length; i++) {
            let combo = combos.pop();
            for (let wheel = 0; wheel < 4; wheel++) {
                for (let shift = 1; shift < 10; shift += 8) {
                    // shift - number which is added to the wheel, adding 9 is equal to subtracting one
                    if (isThisTarget(calculateNextCombo(combo, wheel, shift))) {
                        return steps;
                    }
                }
            }
        }
    }
    return -1;
};

let tests = [
    {
        params: [
            ['0201','0101','0102','1212','2002'],
            '0202'
        ],
        ans: 6,
    },
    {
        params: [
            ['8888'],
            '0009'
        ],
        ans: 1,
    },
    {
        params: [
            ['8887','8889','8878','8898','8788','8988','7888','9888'],
            '8888'
        ],
        ans: -1
    },
    {
        params: [
            ['0000'],
            '8888'
        ],
        ans: -1
    },
];

tests.forEach(test => {
    let res = openLock(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
