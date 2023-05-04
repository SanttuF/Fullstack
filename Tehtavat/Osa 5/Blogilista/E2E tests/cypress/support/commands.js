Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedAppUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('create', ({ username, password, name }) => {
  const user = {
    name,
    username,
    password
  }
  cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
  cy.visit('')
})

Cypress.Commands.add('addBlog', ({ title, author, url, likes=0 }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedAppUser')).token}`
    }
  })
  cy.visit('')
})