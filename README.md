# Testable Chrome Extension Example
An example of how to design a testable and modularized Chrome extension.

## Getting Started
To set up the build environment, run `npm install`, then `bundle install`.

## Running Specs
Run `gulp` to build the extension, then run unit and integration tests.

## How it works
If you haven't already, be sure to read [our blog post](https://www.tinfoilsecurity.com/blog/how-to-create-testable-modularized-chrome-browser-extensions) on how to design a testable Chrome Extension.

This extension is built using Gulp. Because of this, we can split our extension into multiple modules, then concatenate them at build time. 

Unit tests are run by concatenating the background script and the Jasmine spec files, then running them with Karma. Integration tests are run by installing the extension on a Watir browser, then running Rspec tests on the browser.

[![CircleCI](https://circleci.com/gh/tinfoil/testable-chrome-extension-example/tree/master.svg?style=svg)](https://circleci.com/gh/tinfoil/testable-chrome-extension-example/tree/master)
