const process = require('process')
const { ocrDigit, readInputFile } = require('./utils')

if (process.argv.length < 3) {
  console.error('File name not passed')
  process.exit(1)
}

const linesWithData = readInputFile(process.argv[2])

for (let i = 0; i < linesWithData.length - 2; i += 3) {
  const number = [
    linesWithData[i],
    linesWithData[i+1],
    linesWithData[i+2],
  ]

  const digits = []
  let isValidInput = true

  const getDigitPart = (row, col) =>
    number[row].substr(col, 3)
               .replace(/\|/g, 'I') // noticed in example vertical bar is used instead of I
               .padEnd(3, ' ')

  // get digits
  for (let j = 0; j < number[0].length; j += 4) {
    const recognized = ocrDigit([
      getDigitPart(0, j),
      getDigitPart(1, j),
      getDigitPart(2, j),
    ])

    if (recognized) {
      digits.push(recognized)
    } else {
      isValidInput = false
    }
  }

  if (isValidInput) {
    console.log(digits.join(''))
  } else {
    console.log('Error in data')
  }
}

