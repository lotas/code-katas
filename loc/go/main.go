package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"unicode"
)

// LocResult calculations
type LocResult struct {
	totalLinesCount          int
	commentLinesCount        int
	whitespaceLinesCount     int
	codeLinesCount           int
	stringsCount             int
	errorUnterminatedString  bool
	errorUnterminatedComment bool
}

func main() {
	if len(os.Args) < 2 {
		fmt.Printf("Usage: loc <file.cs>\n")
		return
	}

	fmt.Printf("Parsing %s\n", os.Args[1])

	content, err := ioutil.ReadFile(os.Args[1])
	if err != nil {
		fmt.Printf("Cannot read file: %s\n", err)
		os.Exit(1)
	}

	var loc = ParseString(string(content))
	fmt.Printf("Total lines:    %d\n", loc.totalLinesCount)
	fmt.Printf("Lines of Code:  %d\n", loc.codeLinesCount)
	fmt.Printf("Empty lines:    %d\n", loc.whitespaceLinesCount)
	fmt.Printf("Comments lines: %d\n", loc.commentLinesCount)
	fmt.Printf("Strings count:  %d\n", loc.stringsCount)
}

type ParseFsm struct {
	insideMultilineComment  bool
	insideSinglelineComment bool
	insideString            bool
	lineHasCode             bool
}

func ParseString(source string) LocResult {
	var res LocResult
	var fsm ParseFsm
	var prev rune

	for _, chr := range source {

		switch {
		case chr == '\n':
			if fsm.lineHasCode || fsm.insideString {
				res.codeLinesCount++
			} else if fsm.insideMultilineComment || (fsm.insideSinglelineComment && !fsm.lineHasCode) {
				res.commentLinesCount++
			} else if !fsm.lineHasCode {
				res.whitespaceLinesCount++
			}

			res.totalLinesCount++
			fsm.lineHasCode = false
			fsm.insideSinglelineComment = false

		case chr == '/' && prev == '/' && !fsm.insideString && !fsm.insideMultilineComment:
			fsm.insideSinglelineComment = true

		case prev == '/' && chr == '*' && !fsm.insideString && !fsm.insideMultilineComment && !fsm.insideSinglelineComment:
			fsm.insideMultilineComment = true

		case prev == '*' && chr == '/' && fsm.insideMultilineComment:
			fsm.insideMultilineComment = false

		case chr == '"':
			if fsm.insideString {
				fsm.insideString = false
				res.stringsCount++
			} else {
				fsm.insideString = true
			}

		case unicode.IsSpace(chr):
			// nothing

		case !fsm.insideMultilineComment && !fsm.insideSinglelineComment:
			fsm.lineHasCode = true

		}

		prev = chr
	}

	if prev == '\n' && !fsm.insideSinglelineComment && !fsm.insideMultilineComment {
		if fsm.lineHasCode {
			res.codeLinesCount++
		}
		res.totalLinesCount++
	}

	return res
}
