# Project Demonstrating Test Isolation Issues with Cypress

A simple project to demonstrate a subtle and annoying problem in Cypress of test isolation. If using cypress to beforeEach to cleanup server-side state, before first visiting a new page, previous requests that did not finish can mutate the server state unexpectedly. In other words, http requests (and any promises for that matter) are not cleanup by cypress when the next test runs.

Luckily, there is a simple solution, always first load a new page to force the browser to reset the state.
