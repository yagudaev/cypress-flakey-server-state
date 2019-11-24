
describe('Counter App', () => {
  describe('Counting', () => {
    it('increments the counter', () => {
      cy.visit('/')
      cy.contains('Increment').click()
      cy.get('[data-cy="counter"]').contains('1')
    })
  })
})
