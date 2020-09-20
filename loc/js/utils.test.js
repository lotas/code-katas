const { countLoc } = require('./utils')

// Simple test cases for simplicity without using test runners

const res1 = countLoc('const string str1 = "Hello World";')
console.assert(res1.codeLinesCount === 1 && res1.totalLinesCount === 1, "Test 1 failed")

const res2 = countLoc(`/*
  comment
*/
const string str1 = "Hello World";
Int i1 = 55; // comment
`)
console.assert(res2.codeLinesCount === 2 && res2.totalLinesCount === 5, "Test 2 failed")

const res3 = countLoc(`
const string multiline = @"Hello

World
";
// comment
`)
console.assert(res3.codeLinesCount === 4 && res3.totalLinesCount === 6, "Test 3 failed")

const res4 = countLoc(` // how to abuse LOC with lots of new lines
    public // Visibility
    static // Allows for direct call on class without object
    int // Return Type,
    MethodSignatures(
        int maxCount, // First variable, expects an int
        int count = 0, // will default the value to 0 if not passed in
        int another = 3,
        params string[] otherParams // captures all other parameters passed to method
    )
    {
        return -1;
    }
`)
console.assert(res4.codeLinesCount === 12 && res4.totalLinesCount === 13, "Test 4 failed")


const res5 = countLoc(`const string unterminatedString = @"Hello
;`)
console.assert(res5.errorUnterminatedString === true, "Test 6 failed")

const res6 = countLoc('/* unterminated multiline comment block ')
console.assert(res6.errorUnterminatedComment === true, "Test 7 failed")


console.log('all tests passed')