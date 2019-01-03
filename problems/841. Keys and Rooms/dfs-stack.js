/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
let canVisitAllRooms = function(rooms) {
    function visitRoom(roomNumber) {
        if (visited.has(roomNumber)) {
            return;
        }
        visited.add(roomNumber);
        let keys = rooms[roomNumber];
        for (let i = 0; i < keys.length; i++) {
            stack.push(keys[i]);
        }
    }

    let visited = new Set(), stack = [];
    visitRoom(0);
    while (stack.length > 0) {
        visitRoom(stack.pop());
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
