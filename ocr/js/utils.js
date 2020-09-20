const fs = require('fs')
const process = require('process')

const ocrMap = {
  1: [
    '   ',
    '  I',
    '  I'
  ],
  2: [
    ' _ ',
    ' _I',
    'I_ '
  ],
  3: [
    ' _ ',
    ' _I',
    ' _I'
  ],
  4: [
    '   ',
    'I_I',
    '  I'
  ],
  5: [
    ' _ ',
    'I_ ',
    ' _I'
  ],
  6: [
    ' _ ',
    'I_ ',
    'I_I'
  ],
  7: [
    ' _ ',
    '  I',
    '  I'
  ],
  8: [
    ' _ ',
    'I_I',
    'I_I'
  ],
  9: [
    ' _ ',
    'I_I',
    ' _I'
  ],
  0: [
    ' _ ',
    'I I',
    'I_I'
  ],
}


const compareArrays = (arr1, arr2) => arr1.join('') === arr2.join('')

const ocrDigit = (digit) => {
  for (let number in ocrMap) {
    if (compareArrays(digit, ocrMap[number])) {
      return number
    }
  }

  return false
}

const readInputFile = (fileName) => {
  const data = fs.readFileSync(fileName, 'utf-8')
  if (!data) {
    console.error('Empty file')
    process.exit(2)
  }

  const lines = data.split('\n')

  // remove empty lines
  const linesWithData = lines.filter(line => line.trim() != '')

  if (linesWithData.length % 3 !== 0) {
    console.error(`Incorrect number of rows in input data: ${linesWithData.length}`)
    process.exit(3)
  }

  return linesWithData
}

module.exports = {
  compareArrays,
  ocrDigit,
  ocrMap,
  readInputFile,
}