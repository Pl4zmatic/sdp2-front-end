describe('Fill in forms', () => {
  it('can fill in a form', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('[data-cy=admin-login]').click()
    cy.visit('http://localhost:3000/Employees')
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=firstname-input]').type('John');
    cy.get('[data-cy=lastname-input]').type('Doe');
    cy.get('[data-cy=email-input]').type('john.doe@example.com');
    cy.get('[data-cy=street-input]').type('Main Street');
    cy.get('[data-cy=housenr-input]').type('123');
    cy.get('[data-cy=postalcode-input]').type('9000');
    cy.get('[data-cy=city-input]').type('Gent');
    cy.get('[data-cy=birthdate-input]').type('1990-01-01');
    cy.get('[data-cy=phonenr-input]').type('0499123456');
    cy.get('[data-cy=role-input]').select('Technician');
    cy.get('[data-cy=password-input]').type('Test123!');
    cy.get('[data-cy=submit-button]').click();
    cy.get('[data-cy=toast-success]')
      .should('be.visible')
      .and('contain', 'User created successfully')
  })
})

describe('Edit forms', () => {
  it('can edit a user', () => {
    cy.visit('http://localhost:3000/Login')
    cy.get('[data-cy=admin-login]').click()
    cy.visit('http://localhost:3000/Employees')

    cy.contains('[data-cy=user-row]', 'John')
      .contains('Doe')
      .parents('[data-cy=user-row]')
      .within(() => {
        cy.get('[data-cy=edit-button]').click()
      })

    cy.get('[data-cy=firstname-input]')
      .should('be.visible')
      .clear()
      .type('Jonathan')

    cy.get('[data-cy=lastname-input]')
      .clear()
      .type('Doe-Smith')

    cy.get('[data-cy=email-input]')
      .clear()
      .type('jonathan.doe-smith@example.com')

    cy.get('[data-cy=submit-button]').click()

    cy.get('[data-cy=toast-success]')
      .should('be.visible')
      .and('contain', 'User updated successfully')

    cy.contains('[data-cy=user-row]', 'Jonathan')
      .contains('Doe-Smith')
      .should('exist')

    cy.contains('[data-cy=user-row]', 'Jonathan').should('exist')
  })
})
