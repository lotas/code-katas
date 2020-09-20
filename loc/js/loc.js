const fs = require('fs')
const process = require('process')
const { countLoc } = require('./utils')

if (process.argv.length < 3) {
  console.error('File name not passed')
  process.exit(1)
}

const source = fs.readFileSync(process.argv[2], 'utf-8')

const {
  totalLinesCount,
  codeLinesCount,
  whitespaceLinesCount,
  commentLinesCount,
  stringsCount,
  errorUnterminatedComment,
  errorUnterminatedString,
} = countLoc(source)

if (errorUnterminatedComment) {
  console.warn('Source contains unterminated multi-line comment')
}
if (errorUnterminatedString) {
  console.warn('Source contains unterminated string')
}

console.log(`
  Input file: ${process.argv[2]}

  Total lines:    ${totalLinesCount}
  Lines of Code:  ${codeLinesCount}
  Empty lines:    ${whitespaceLinesCount}
  Comments lines: ${commentLinesCount}
  Strings count:  ${stringsCount}
`)