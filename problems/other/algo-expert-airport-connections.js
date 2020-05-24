/*
Problem source:
https://www.youtube.com/watch?v=qz9tKlF431k
I paused the video and solved the problem myself. But I needed a bit more time than 60 minutes
    and some hints - I watched up to 15 minute mark when William Lin explains about replacing groups of nodes
    with single nodes for simplicity

I decided to code this by myself as a training exercise
Since I was not aware of algorithm for cyclic groups of nodes, I'm not going to use them
Simple depth first search in both ways will do the trick (even one-way search would do the trick)

The fact that airport connections are one-way doesn't matter for this task (or so it seems)
The task is to reach every airport from the starting airport, not to reach every airport AND BACK!
Maybe that condition is added as a follow-up condition, but I haven't finished watching the video by the time
    I made this code

Time complexity: O(n*d), where n - number of airports (nodes), d - number of connections (edges)
Space complexity: O(n*d), but I'm not 100% sure about this one
 */

function GraphNode(name) {
    this.name = name;
    this.outgoingConnections = [];
    this.incomingConnections = [];
}

/**
 * Calculate the number of routes you need to add to reach every airport in the list of airports from starting airport
 * @param start {string}        Starting airport
 * @param airports {string[]}   List of all airports
 * @param routes {string[][]}   List of one-way routes between airports
 * @returns {number}
 */
function airportsAndConnections(start, airports, routes) {
    const airportNodes = new Map();
    let startAirportNode;
    let requiredConnections = 0;

    // create airport nodes
    for (let name of airports) {
        const airportNode = new GraphNode(name);
        if (name === start) {
            startAirportNode = airportNode;
        }
        airportNodes.set(name, airportNode);
    }

    const unreachableAirports = new Set(airports);

    // add graph children connections
    for (let connection of routes) {
        const [originAirport, destinationAirport] = connection;
        const airportFrom = airportNodes.get(originAirport);
        const airportTo = airportNodes.get(destinationAirport);
        airportFrom.outgoingConnections.push(airportTo);
        airportTo.incomingConnections.push(airportFrom);
        // find "starter point" airports by removing those that have incoming connections from the list of all APs
        unreachableAirports.delete(airportTo.name);
    }

    // find airports that are not yet connected to start or unreachable airports
    const disconnected = new Set(airportNodes.values());
    unreachableAirports.add(start);
    requiredConnections--; // to compensate for adding start to unreachable airports
    while (unreachableAirports.size > 0) {
        requiredConnections++;
        const unreachableAirportIterator = unreachableAirports.values();
        const stack = [airportNodes.get(unreachableAirportIterator.next().value)];
        unreachableAirports.delete(stack[0].name);
        const visited = new Set();
        while (stack.length > 0) {
            const airportNode = stack.pop(); // stack has names, not nodes
            if (visited.has(airportNode)) {
                continue;
            }
            visited.add(airportNode);
            disconnected.delete(airportNode);
            stack.push(...airportNode.outgoingConnections);
        }
    }

    const disconnectedAirportIterator = disconnected.values();
    while (!disconnectedAirportIterator.done) {
        requiredConnections++;
        const visited = new Set();
        const stack = [disconnectedAirportIterator.next().value];
        while (stack.length > 0) {
            const airportNode = stack.pop();
            if (visited.has(airportNode)) {
                continue;
            }
            visited.add(airportNode);
            disconnected.delete(airportNode);
            if (disconnected.size === 0) {
                break;
            }
            stack.push(...airportNode.incomingConnections);
            stack.push(...airportNode.outgoingConnections);
        }
        if (disconnected.size === 0) {
            break;
        }
    }

    return requiredConnections;
}

const tests = [
    {
        inputs: [
            'lga',
            [ // airports
                'bgi','cdg','del','doh','dsm','ewr','eyw','hnd','icn',
                'jfk','lga','lhr','ord','san','sfo','sin','tlv','bud'
            ],
            [ // one-way connections
                ['bgi','lga'],
                ['cdg','bud'],
                ['cdg','sin'],
                ['del','cdg'],
                ['del','doh'],
                ['dsm','ord'],
                ['ewr','hnd'],
                ['eyw','lhr'],
                ['hnd','icn'],
                ['hnd','jfk'],
                ['icn','jfk'],
                ['jfk','lga'],
                ['lhr','sfo'],
                ['ord','bgi'],
                ['san','eyw'],
                ['sfo','dsm'],
                ['sfo','san'],
                ['sin','cdg'],
                ['tlv','del']
            ] // end of connections
        ],
        outputs: 3 // number of routes to add in order to make any airport reachable, no matter how many transfers are needed
    }
];

for (let test of tests) {
    const res = airportsAndConnections(...test.inputs);
    const correct = res === test.outputs;
    console.log(`expected: '${test.outputs}' | calculated: '${res}' | result is`, correct ? 'CORRECT' : 'WRONG!');
}
