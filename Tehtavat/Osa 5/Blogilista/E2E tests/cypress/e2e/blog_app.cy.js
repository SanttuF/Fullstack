describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.create({
      name: 'test user',
      username: 'test',
      password: 'test123'})
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test123')
      cy.get('#loginButton').click()

      cy.get('.error').contains('logged in as test user')
      cy.contains('test user logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy.get('.error').contains('wrong username or password')
      cy.contains('login')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username:'test', password:'test123'})
    })

    it('blog can be created', function() {
      cy.contains('New blog').click()

      cy.get('#title').type('testing')
      cy.get('#author').type('mr test')
      cy.get('#url').type('test.url')

      cy.get('#submit').click()

      cy.get('.error').contains('new blog testing by mr test added')
      cy.contains('testing mr test')
    })

    it('blog can be liked', function() {
      cy.addBlog({title:'test', author:'testAuthor', ulr:'test.url'})
      cy.contains('view').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')
    })

    it('creator can delete blog', function() {
      cy.addBlog({title:'test', author:'testAuthor', ulr:'test.url'})
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.error').contains('blog test has been removed')
      cy.contains('test testAuthor').should('not.exist')
    })

    it('only creator sees remove button', function() {
      cy.addBlog({title:'test', author:'testAuthor', ulr:'test.url'})
      cy.contains('logout').click()
      cy.create({
        name: 'test user2',
        username: 'test2',
        password: 'test123'
      })
      cy.login({username:'test2', password:'test123'})

      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it('blogs are ordered by number of likes', function() {
      cy.addBlog({title:'second most likes', author:'testAuthor1', ulr:'test.url', likes:2})
      cy.addBlog({title:'third most likes', author:'testAuthor2', ulr:'test.url', likes:1})
      cy.addBlog({title:'most likes', author:'testAuthor3', ulr:'test.url', likes:3})

      cy.get('.blog').eq(0).should('contain', 'most likes')
      cy.get('.blog').eq(1).should('contain', 'second most likes')
      cy.get('.blog').eq(2).should('contain', 'third most likes')
    })
  })
})