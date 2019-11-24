
describe('Counter App', () => {
  describe('Counting', () => {
    beforeEach(() => {
      resetServerData()
      cy.visit('/')
    })

    it('increments the counter', () => {
      cy.contains('Increment').click()
      cy.get('[data-cy="counter"]').contains('1')

      cy.server()
      cy.route('POST', 'http://localhost:4000/counter').as('increment')
      cy.contains('Increment').click() // "accidental" call to show flakiness
      cy.wait('@increment')
    })

    it('resets the count', () => {
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
