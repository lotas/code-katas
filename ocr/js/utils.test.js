const { compareArrays, ocrDigit } = require('./utils')

// simple test cases without using test runners
// node utils.test.js

console.assert(compareArrays([], []) === true, 'Empty arrays are not equal')
console.assert(compareArrays([1,2,3], [1,2,3]) === true, 'Arrays are not equal')
console.assert(compareArrays([1], [2,3]) === false, 'Arrays are equal')

console.assert(ocrDigit([
  '   ',
  '  I',
  '  I'
]) === '1', '1 cannot be recognized')
console.assert(ocrDigit([
  ' _ ',
  ' _I',
  'I_ '
]) === '2', '2 cannot be recognized')
console.assert(ocrDigit([
  ' _ ',
  ' _I',
  ' _I'
]) === '3', '3 cannot be recognized')
console.assert(ocrDigit([
  '   ',
  'I_I',
  '  I'
]) === '4', '4 cannot be recognized')
console.assert(ocrDigit([
  ' _ ',
  'I_ ',
  ' _I'
]) === '5', '5 cannot be recognized')
console.assert(ocrDigit([
  ' _ ',
  'I_ ',
  'I_I'
]) === '6', '6 cannot be recognized')
console.assert(ocrDigit([
  ' _ ',
  '  I',
  '  I'
]) === '7', '7 cannot be recognized')
console.assert(ocrDigit([
  ' _ ',
  'I_I',
  'I_I'
]) === '8', '8 cannot be recognized')
console.assert(ocrDigit([
  ' _ ',
  'I_I',
  ' _I'
]) === '9', '9 cannot be recognized')
console.assert(ocrDigit([
  ' _ ',
  'I I',
  'I_I'
]) === '0', '0 cannot be recognized')

console.log('All tests passed')