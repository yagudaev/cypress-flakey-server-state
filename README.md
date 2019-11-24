# Project Demonstrating Test Isolation Issues with Cypress

A demonstration of how easy it is to create flakey tests with Cypress when depending on server state.

The app is a counter that is persisted to the server. You can increment the count & reset it. On page refresh the count will be read from the server.

# Tests

In the first test, we check that incrementing the counter works properly. However, we "accidentally" click it one extra time at the end of the test.

```javascript
beforeEach(() => {
  resetServerData()
  cy.visit('/')
})

it('increments the counter', () => {
  cy.contains('Increment').click()
  cy.get('[data-cy="counter"]').contains('1')
  cy.contains('Increment').click() // "accidental" call to show flakiness
})
```

In the second test, we check that resetting the counter works. This will work some of the time.

```javascript
beforeEach(() => {
  resetServerData()
  cy.visit('/')
})

it('resets the count', () => {
  cy.contains('Increment').click()
  cy.get('[data-cy="counter"]').contains('1')
  cy.contains('Reset').click()
  cy.get('[data-cy="counter"]').contains('0')
})
```

Why is that? Well, the server is setup to simulate latency for the second request to increment the counter. Occasionally, the timing works just right so that the second test starts before the 2nd increment request from the first test finished. When this happens, instead of the count being reset to 0 at the beginning of the 2nd test, it actually starts at 2 and incremented to 3. Therefore, it never shows up as 1, which we expect to happen in the test.

This situation will get worse the more tests we add.

# Solution

Luckily solving this problem is relatively easy after you have spotted it. You simply need to wait for the second request to finish.

```javascript
it('increments the counter', () => {
  cy.contains('Increment').click()
  cy.get('[data-cy="counter"]').contains('1')

  cy.server()
  cy.route('POST', 'http://localhost:4000/counter').as('increment')
  cy.contains('Increment').click() // "accidental" call to show flakiness
  cy.wait('@increment')
})
```

See: `#solution` branch.

Sadly, Cypress does not have a mechanism to wait for all pending request to finish before starting the next test. (https://github.com/cypress-io/cypress/issues/1773#issuecomment-392102387)

# Alternative Solution?

You would think that waiting for the number `2` to appear on the page would work. Something like:

```javascript
it('increments the counter', () => {
  cy.contains('Increment').click()
  cy.get('[data-cy="counter"]').contains('1')

  cy.contains('Increment').click() // "accidental" call to show flakiness
  cy.get('[data-cy="counter"]').contains('2')
})
```

However this will fail just like before. Why? Well, if you look at the frontend carefully you will see an optimistic update.

```javascript
function setRemoteCount(newCount) {
  setCount(newCount) // optimistic update

  return axios.post('/counter', { counter: newCount }).then(() => {
    setCount(newCount)
  })
}
```

An optimistic update changes the UI to the desired state before receiving conformation from the server. This means, that the assertion will pass, but the server request will still be in-flight. Therefore, we will endup in the same situation as before.

# Install

1. Install both client

```bash
cd client && yarn install
```

2. Install the server

```bash
cd server && yarn install
```

3. Install cypress

```
yarn install
```

# Run

Run the app in one terminal:

```
yarn run dev
```

In another terminal run cypress:

```
yarn cypress open
```
