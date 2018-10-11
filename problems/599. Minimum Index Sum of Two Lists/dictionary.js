const compareArrays = require('../helper.js').compareArrays;

/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
let findRestaurant = function(list1, list2) {
    let dict = new Map(), res = [], minIndex = 3000;

    for (let i = 0; i < list1.length; i++) {
        dict.set(list1[i], i);
    }

    for (let i = 0; i < list2.length; i++) {
        if (dict.has(list2[i])) {
            let index = dict.get(list2[i]) + i;
            if (index < minIndex) {
                minIndex = index;
                res = [list2[i]];
            } else if (index === minIndex) {
                res.push(list2[i]);
            }
        }
    }

    return res;
};

let tests = [
    {
        s1: ['Shogun', 'Tapioca Express', 'Burger King', 'KFC'],
        s2: ['Piatti', 'The Grill at Torrey Pines', 'Hungry Hunter Steakhouse', 'Shogun'],
        ans: ['Shogun']
    },
    {
        s1: ['Shogun', 'Tapioca Express', 'Burger King', 'KFC'],
        s2: ['KFC', 'Shogun', 'Burger King'],
        ans: ['Shogun']
    },
];

tests.forEach(test => {
    let res = findRestaurant(test.s1, test.s2);
    let correct = compareArrays(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
