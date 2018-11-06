
// todo: fix bug
// bug
// when you find one island from the sea from 2 points, it gets added to land queue
// land is not processed immediately, it gets processed one item at a time
// adding 2 pieces of the same island to land queue results in processing these two pieces as two independent land pieces

// solution overview
// bug happens because we add two things to land from sea, and then process one land item at a time
// solution: don't mark land as visited
// solution: change how many tiles your process before taking further actions (instead of processing 4 items, process 1 at a time)

// solution 1
// mark item as visited for sea only, re-process land tiles (needs more time, as some tiles will be processed multiple times)

// solution 2
// simplify
// make two crawlers
// one crawler for next item in general
// second crawler for next island item
// process one item at a time
// processed 1 tile, if it is land, process island
// if it is sea, add it to queue and continue
// crawler - counter that keeps current shift in closure
//      next item is in carousel U R D L (row -1, col + 1, row + 1, col -1)
//      potential simplification: using row.length and col.length and index

/**
 * @param {number[][]} grid
 * @return {number}
 */
let numIslands = function(grid) {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    function Queue() {
        this.head = this.tail = null;
    }
    Queue.prototype.enQueue = function(val) {
        if (this.isEmpty()) {
            this.head = this.tail = new ListNode(val);
        } else {
            this.tail.next = new ListNode(val);
            this.tail = this.tail.next;
        }
    };
    Queue.prototype.deQueue = function() {
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

    function processItem(row, col) {
        if (
            row >= grid.length ||
            row < 0 ||
            col >= grid[0].length ||
            col < 0 ||
            visited[row][col]
        ) {
            return;
        }
        visited[row][col] = true;
        if (grid[row][col] == 1) {
            landQueue.enQueue({row, col});
        } else {
            seaQueue.enQueue({row, col});
        }
    }

    function processIsland() {
        islands++;
        while (!landQueue.isEmpty()) {
            let {row, col} = landQueue.deQueue();
            processNeighbours(row, col);
        }
    }

    function processNeighbours(row, col) {
        processItem(row - 1, col);
        processItem(row + 1, col);
        processItem(row, col - 1);
        processItem(row, col + 1);
    }

    let seaQueue = new Queue(), landQueue = new Queue(), visited = [], islands = 0;
    for (let i = 0; i < grid.length; i++) {
        visited[i] = [];
    }

    processItem(0, 0);

    while (!landQueue.isEmpty() || !seaQueue.isEmpty()) {
        if (!landQueue.isEmpty()) {
            processIsland();
        }
        if (!seaQueue.isEmpty()) {
            let {row, col} = seaQueue.deQueue();
            processNeighbours(row, col);
        }
    }

    return islands;
};

/* original array with 58 as ans
[
["1","0","0","1","1","1","0","1","1","0","0","0","0","0","0","0","0","0","0","0"],
["1","0","0","1","1","0","0","1","0","0","0","1","0","1","0","1","0","0","1","0"],
["0","0","0","1","1","1","1","0","1","0","1","1","0","0","0","0","1","0","1","0"],
["0","0","0","1","1","0","0","1","0","0","0","1","1","1","0","0","1","0","0","1"],
["0","0","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","0","0"],
["1","0","0","0","0","1","0","1","0","1","1","0","0","0","0","0","0","1","0","1"],
["0","0","0","1","0","0","0","1","0","1","0","1","0","1","0","1","0","1","0","1"],
["0","0","0","1","0","1","0","0","1","1","0","1","0","1","1","0","1","1","1","0"],
["0","0","0","0","1","0","0","1","1","0","0","0","0","1","0","0","0","1","0","1"],
["0","0","1","0","0","1","0","0","0","0","0","1","0","0","1","0","0","0","1","0"],
["1","0","0","1","0","0","0","0","0","0","0","1","0","0","1","0","1","0","1","0"],
["0","1","0","0","0","1","0","1","0","1","1","0","1","1","1","0","1","1","0","0"],
["1","1","0","1","0","0","0","0","1","0","0","0","0","0","0","1","0","0","0","1"],
["0","1","0","0","1","1","1","0","0","0","1","1","1","1","1","0","1","0","0","0"],
["0","0","1","1","1","0","0","0","1","1","0","0","0","1","0","1","0","0","0","0"],
["1","0","0","1","0","1","0","0","0","0","1","0","0","0","1","0","1","0","1","1"],
["1","0","1","0","0","0","0","0","0","1","0","0","0","1","0","1","0","0","0","0"],
["0","1","1","0","0","0","1","1","1","0","1","0","1","0","1","1","1","1","0","0"],
["0","1","0","0","0","0","1","1","0","0","1","0","1","0","0","1","0","0","1","1"],
["0","0","0","0","0","0","1","1","1","1","0","1","0","0","0","1","1","0","0","0"]
]
 */

let tests = [
    {
        params: [
            [
                ["0","1"],
                ["1","1"],
            ],
            50 //removed
        ],
        ans: 58 // should be 8
    },
    {
        params: [
            [
                ["0","1","0"],
                ["1","0","1"],
                ["0","1","0"],
            ],
        ],
        ans: 4
    },
    {
        params: [
            [
                [1,1,1,1,0],
                [1,1,0,1,0],
                [1,1,0,0,0],
                [0,0,0,0,0],
            ],
        ],
        ans: 1
    },
    {
        params: [
            [
                [1,1,1,1,0],
                [1,1,0,1,0],
                [1,1,0,0,1],
                [0,0,1,1,1],
            ],
        ],
        ans: 2
    },
    {
        params: [
            [
                [1,1,0,0,0],
                [1,1,0,0,0],
                [0,0,1,0,0],
                [0,0,0,1,1],
            ],
        ],
        ans: 3 // 3 separate groups of 1s that have 0 around them (up left right bottom)
    },
];

tests.forEach(test => {
    let res = numIslands(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
