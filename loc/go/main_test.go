package main

import (
	"testing"
)

func TestParseString(t *testing.T) {
	var loc = ParseString(`
	const string str1 = \"Hello World\";
	`)
	if loc.totalLinesCount != 1 && loc.codeLinesCount != 1 {
		t.Errorf("Expected 1 loc / 1 total, got %d / %d", loc.codeLinesCount, loc.totalLinesCount)
	}
}
