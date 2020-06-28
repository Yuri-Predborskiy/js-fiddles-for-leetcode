/*
Rebuild path from provided tickets

Inspired by discussion
https://leetcode.com/problems/reconstruct-itinerary/discuss/415639/javascript-easy-to-understand
 */

const {compareArraysStrict} = require('../helper');

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
let findItinerary = function(tickets) {
    const result = [];
    const origin = 'JFK';

    const map = tickets.reduce((acc, [from, to]) => {
        if (acc[from]) {
            acc[from].push(to);
        } else {
            acc[from] = [to];
        }
        return acc;
    }, {});

    for (let record of Object.values(map)) {
        record.sort();
    }

    function makeItinerary(origin) {
        const destinations = map[origin];
        while (destinations && destinations.length > 0) {
            makeItinerary(destinations.shift());
        }
        result.unshift(origin);
    }

    makeItinerary(origin);

    return result;
};

let tests = [
    {
        params: [[["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]],
        ans: ["JFK", "MUC", "LHR", "SFO", "SJC"]
    },
    {
        params: [[["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]],
        ans: ["JFK","ATL","JFK","SFO","ATL","SFO"]
    }
];

tests.forEach(test => {
    let res = findItinerary(...test.params);
    let correct = compareArraysStrict(test.ans, res);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
