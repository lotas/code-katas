.DEFAULT_GOAL := help
.PHONY: help ocr-run-js ocr-test-js loc-run-js loc-test-js

GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

TARGET_MAX_CHAR_NUM=25

help:
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## OCR :: run js
ocr-run-js:
		@for i in ocr/data/*.txt; do \
			echo "Testing $$i"; \
			node ocr/js/ocr.js $$i || (echo "Failed$$?"); \
		done

## OCR :: run tests
ocr-test-js:
		@node ocr/js/utils.test.js


## LOC :: run js
loc-run-js:
		@for i in loc/data/*.cs; do \
			echo "Testing $$i"; \
			node loc/js/loc.js $$i || (echo "Failed$$?"); \
		done

## LOC :: run tests
loc-test-js:
		@node loc/js/utils.test.js
