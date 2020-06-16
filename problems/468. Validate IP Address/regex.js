/*
Validate IP address, ipv4 and ipv6 can both be present

Solution using regular expressions. Inspired by LeetCode Official Solution:
https://leetcode.com/problems/validate-ip-address/solution/

Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {string} IP
 * @return {string}
 */
let validIPAddress = function(IP) {
    function isIpv4(ip) {
        const numberGroup = '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
        const regex = new RegExp(`^(${numberGroup}.){3}${numberGroup}$`);
        return regex.test(ip);
    }
    function isIpv6(ip) {
        const charGroup = '([0-9a-fA-F]{1,4})'
        const regex = new RegExp(`^(${charGroup}:){7}${charGroup}$`);
        return regex.test(ip);
    }

    for (let i = 0; i < 5; i++) {
        if (IP[i] === '.') {
            return isIpv4(IP) ? 'IPv4' : 'Neither';
        }
        if (IP[i] === ':') {
            return isIpv6(IP) ? 'IPv6' : 'Neither';
        }
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
