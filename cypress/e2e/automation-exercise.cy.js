/// <reference types="cypress" />

describe('Automation Exercise', () => {
  const base = 'https://automationexercise.com'

  beforeEach(() => {
    // Configura um timeout maior para a página carregar
    cy.visit(base, { timeout: 120000 })
  })

  it('Acessa a Home e verifica título', () => {
    // Verifica o título e elementos principais da página
    cy.title().should('include', 'Automation Exercise')
    cy.get('.features_items', { timeout: 30000 }).should('be.visible')
    cy.get('.footer-bottom').should('exist')
  })

  it('Busca produto e adiciona ao carrinho', () => {
    // Navega para a página de produtos
    cy.get('a[href="/products"]').first().click()
    cy.url().should('include', '/products')
    
    // Garante que a lista de produtos está visível
    cy.get('.features_items', { timeout: 10000 }).should('be.visible')
    
    // Hover sobre o produto e adiciona ao carrinho
    cy.get('.product-overlay').first().invoke('show')
    cy.get('.product-overlay .add-to-cart').first().click({ force: true })
    
    // Verifica se o modal de sucesso aparece
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible')
    cy.contains('Added!').should('be.visible')
    
    // Fecha o modal
    cy.get('.close-modal').click({ force: true })
    cy.get('.modal-content').should('not.be.visible')
  })

  it('Realiza cadastro de novo usuário', () => {
    // Acessa a página de login/registro
    cy.contains('Signup / Login').click()
    
    // Verifica se está na página correta
    cy.get('.signup-form', { timeout: 10000 }).should('be.visible')
    
    // Preenche o formulário de cadastro com dados únicos
    const timestamp = Date.now()
    const testUser = {
      name: `Teste User ${timestamp}`,
      email: `teste.user.${timestamp}@example.com`
    }
    
    cy.get('input[data-qa="signup-name"]').should('be.visible').type(testUser.name)
    cy.get('input[data-qa="signup-email"]').should('be.visible').type(testUser.email)
    
    // Clica no botão de cadastro
    cy.get('button[data-qa="signup-button"]').click()
    
    // Verifica se foi redirecionado para a página de cadastro completo
    cy.url().should('include', '/signup')
    cy.get('h2.title', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Enter Account Information')
  })
})