/*
Validate IP address, ipv4 and ipv6 can both be present

Solution without using regular expressions. Character sets are used instead.
IPv6 is checked using a set of allowed lowercase, uppercase characters and digits
IPv4 is checked against digit set
Extra checks for lengths and leading zeroes for ipv4

Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {string} IP
 * @return {string}
 */
let validIPAddress = function(IP) {
    function isIpv4(ip) {
        // check for things that are unacceptable for ipv4
        const array = ip.split('.');
        if (array.length !== 4) {
            return false;
        }
        for (let part of array) {
            if (part.length > 3 || part.length < 1 || (part.startsWith('0') && part !== '0')) {
                return false;
            }
            for (let digit of part) {
                if (!digits.has(digit)) {
                    return false; // non-digits are not allowed
                }
            }

            const parsed = Number.parseInt(part);
            if (parsed > 255) {
                return false; // valid numbers are 0 to 255, symbols are not present by definition
            }
        }
        return true;
    }
    function isIpv6(ip) {
        // check for things that are unacceptable for ipv6
        const array = ip.split(':');
        if (array.length !== 8) {
            return false;
        }
        for (let part of array) {
            if (part.length > 4 || part.length < 1) {
                return false;
            }
            for (let char of part) {
                if (!(allowedLetters.has(char) || digits.has(char))) {
                    return false;
                }
            }
        }
        return true;
    }
    const allowedLetters = new Set(['a','b','c','d','e','f', 'A','B','C','D','E','F']);
    const digits = new Set(['0','1','2','3','4','5','6','7','8','9'])

    if (isIpv4(IP)) {
        return "IPv4";
    }
    if (isIpv6(IP)) {
        return "IPv6";
    }
    return "Neither";
};

let tests = [
    {params: ['192.0.0.1'], ans: 'IPv4'},
    {params: ['172.16.254.1'], ans: 'IPv4'},
    {params: ['1.1.1.255'], ans: 'IPv4'},
    {params: ['2001:0db8:85a3:0:0:8A2E:0370:7334'], ans: 'IPv6'},
    {params: ['2001:0db8:85a3:0000:0000:8a2e:0370:7334'], ans: 'IPv6'},
    {params: ['1e1.4.5.6'], ans: 'Neither'},
    {params: ['192.0a.0.1'], ans: 'Neither'},
    {params: ['256.256.256.256'], ans: 'Neither'},
    {params: ['172.16.254.01'], ans: 'Neither'},
    {params: ['072.16.254.11'], ans: 'Neither'},
    {params: ['1.1.1.256'], ans: 'Neither'},
    {params: ['12..33.4'], ans: 'Neither'},
    {params: ['2001:0db8:85a3::8A2E:0370:7334'], ans: 'Neither'},
    {params: ['20EE:FGb8:85a3:0:0:8A2E:0370:7334'], ans: 'Neither'}, // characters only A to F, not mentioned in Q
];

tests.forEach(test => {
    let res = validIPAddress(...test.params);
    let correct = res === test.ans;
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
