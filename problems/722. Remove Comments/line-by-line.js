const { compareArraysStrict } = require('../helper');
/*
Remove comments from code, return each line as a string in an array
Read the input line by line, set flags, save code when line ends
Output code as required

Time complexity: O(n)
Space complexity: O(n) - cannot be avoided unless we modify the source directly
considering immutability of strings, some level of space complexity cannot be avoided in JS
 */

/**
 * @param {string[]} source
 * @return {string[]}
 */
let removeComments = function(source) {
    function compile(line, isBlockComment) {
        let code = '';
        for (let i = 0; i < line.length; i++) {
            if (isBlockComment) {
                if (line[i] === '*' && line[i+1] === '/') {
                    isBlockComment = false;
                    i += 1;
                }
            } else {
                if (line[i] === '/') {
                    if (line[i+1] === '*') {
                        isBlockComment = true;
                        i += 1;
                        continue;
                    }
                    if (line[i+1] === '/') {
                        break;
                    }
                }
                code += line[i];
            }
        }
        return {code, isBlockComment};
    }

    const accumulatedCode = [];
    let lineNumber = 0;
    let codeBlock = '', isMultilineCommentActive = false;
    for (let line of source) {
        lineNumber++;
        const {code, isBlockComment} = compile(line, isMultilineCommentActive);
        isMultilineCommentActive = isBlockComment;
        codeBlock += code;
        if (!isBlockComment && codeBlock.length > 0) {
            accumulatedCode.push(codeBlock);
            codeBlock = '';
        }

    }

    return accumulatedCode;
};

let tests = [
    {
        params: [[
            "main() {",
            "   func(1);",
            "   /** / more comments here",
            "   float f = 2.0", "   f += f;",
            "   cout << f; */",
            "}"
        ]],
        ans: [
            "main() {",
            "   func(1);",
            "   ",
            "}"
        ]
    },
    {
        params: [[
            "struct Node{",
            "    /*/ declare members;/**/",
            "    int size;",
            "    /**/int val;",
            "};"
        ]],
        ans: [
            "struct Node{",
            "    ",
            "    int size;",
            "    int val;",
            "};"
        ]
    },
    {
        params: [[
            "/*Test program */",
            "int main()",
            "{ ",
            "  // variable declaration ",
            "int a, b, c;",
            "/* This is a test",
            "   multiline  ",
            "   comment for ",
            "   testing */",
            "a = b + c;",
            "}"
        ]],
        ans: [
            "int main()",
            "{ ",
            "  ",
            "int a, b, c;",
            "a = b + c;",
            "}"
        ]
    },
    {
        params: [[" "]],
        ans: [" "]
    },
    {
        params: [["// asdasd"]],
        ans: []
    },
];

tests.forEach(test => {
    let res = removeComments(...test.params);
    let correct = compareArraysStrict(res, test.ans);
    console.log('expected:', test.ans, '| calculated:', res, '| result is', correct ? 'CORRECT' : 'WRONG!');
});
