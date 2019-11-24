
describe('Counter App', () => {
  describe('Counting', () => {
    beforeEach(() => {
      cy.visit('/')
      resetServerData()
      cy.visit('/')
    })

    it('increments the counter', () => {
      cy.contains('Increment').click()
      cy.get('[data-cy="counter"]').contains('1')
      cy.contains('Increment').click()
    })

    it('can reset the count', () => {
      cy.contains('Increment').click()
      cy.get('[data-cy="counter"]').contains('1')
      cy.contains('Reset').click()
      cy.get('[data-cy="counter"]').contains('0')
    })
  })
})

function resetServerData() {
  cy.request('POST', 'http://localhost:4000/counter', { counter: 0 })
}
