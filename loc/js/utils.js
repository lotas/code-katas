function countLoc(source) {
  let totalLinesCount = 0
  let commentLinesCount = 0
  let whitespaceLinesCount = 0
  let codeLinesCount = 0
  let stringsCount = 0
  let errorUnterminatedString = false
  let errorUnterminatedComment = false

  // simple fsm flags
  let insideMultilineComment = false
  let insideSinglelineComment = false
  let insideString = false
  let lineHasCode = false

  let prevChar = ''
  let i = 0

  while (i < source.length) {
    const ch = source.charAt(i)

    if (ch === '\n') {

      if (lineHasCode || insideString) {
        codeLinesCount += 1
      } else if (insideMultilineComment || (insideSinglelineComment && !lineHasCode)) {
        commentLinesCount += 1
      } else {
        whitespaceLinesCount +=1
      }

      totalLinesCount += 1
      lineHasCode = false
      insideSinglelineComment = false

    } else if (ch === '/') {

      if (!insideString) {
        if (prevChar === '/') {
          insideSinglelineComment = true
        } else if (prevChar === '*' && insideMultilineComment) {
          insideMultilineComment = false
        }
      }

    } else if (ch === '*') {
      if (!insideString && prevChar === '/') {
        insideMultilineComment = true
      }

    } else if (ch === '"') {
      if (insideString) {
        insideString = false
        stringsCount += 1
      } else {
        insideString = true
      }

    } else if (ch === ' ' || ch === '\t' || ch === '\r') {
      // Empty spaces, what are we living for ...

    } else if (!insideMultilineComment && !insideSinglelineComment) {
      lineHasCode = true
    }

    prevChar = ch
    i += 1
  }

  if (prevChar !== '\n' && !insideSinglelineComment && !insideMultilineComment) {
    if (lineHasCode) {
      codeLinesCount += 1 // if last line was not terminated with newline
    }
    totalLinesCount += 1
  }

  if (insideMultilineComment) {
    errorUnterminatedComment = true
  }
  if (insideString) {
    errorUnterminatedString = true
  }

  return {
    totalLinesCount,
    commentLinesCount,
    whitespaceLinesCount,
    codeLinesCount,
    stringsCount,
    errorUnterminatedComment,
    errorUnterminatedString,
  }
}

module.exports = {
  countLoc,
}
