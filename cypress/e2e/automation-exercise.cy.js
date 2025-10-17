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
    cy.xpath('//div[contains(@class,"features_items")]').should('be.visible')
    cy.xpath('//div[contains(@class,"footer-bottom")]').should('exist')
  })

  it('Busca produto e adiciona ao carrinho', () => {
    // Navega para a página de produtos
    cy.xpath('//a[@href="/products"]').first().click()
    cy.url().should('include', '/products')
    
    // Garante que a lista de produtos está visível
    cy.xpath('//div[contains(@class,"features_items")]').should('be.visible')
    
    // Hover sobre o produto e adiciona ao carrinho
    cy.xpath('(//div[contains(@class,"product-overlay")])[1]').invoke('show')
    cy.xpath('(//div[contains(@class,"product-overlay")])[1]//button[contains(@class,"add-to-cart")]').click({ force: true })
    
    // Verifica se o modal de sucesso aparece
    cy.xpath('//div[contains(@class,"modal-content")]').should('be.visible')
    cy.xpath('//*[contains(text(),"Added!")]').should('be.visible')
    
    // Fecha o modal
    cy.xpath('//button[contains(@class,"close-modal")]').click({ force: true })
    cy.xpath('//div[contains(@class,"modal-content")]').should('not.be.visible')
  })

  it('Realiza cadastro de novo usuário', () => {
    // Acessa a página de login/registro
    cy.xpath("//a[contains(text(),'Signup / Login')]").click()
    
    // Verifica se está na página correta
    cy.xpath('//form[contains(@class,"signup-form")]').should('be.visible')
    
    // Preenche o formulário de cadastro com dados únicos
    const timestamp = Date.now()
    const testUser = {
      name: `Teste User ${timestamp}`,
      email: `teste.user.${timestamp}@example.com`
    }
    
    cy.xpath('//input[@data-qa="signup-name"]').should('be.visible').type(testUser.name)
    cy.xpath('//input[@data-qa="signup-email"]').should('be.visible').type(testUser.email)
    
    // Clica no botão de cadastro
    cy.xpath('//button[@data-qa="signup-button"]').click()
    
    // Verifica se foi redirecionado para a página de cadastro completo
    cy.url().should('include', '/signup')
    cy.xpath('//h2[contains(@class,"title")]').should('be.visible').and('contain', 'Enter Account Information')
  })

  /* 
   * Observações sobre o uso de XPath vs CSS Selectors:
   *
   * 1. Legibilidade:
   * - XPath tende a ser mais verboso e pode ser menos intuitivo para iniciantes
   * - Exemplo XPath: //div[contains(@class,"features_items")]
   * - Equivalente CSS: .features_items
   * 
   * 2. Velocidade de Execução:
   * - Seletores XPath podem ser ligeiramente mais lentos que CSS
   * - Em projetos pequenos/médios, a diferença é insignificante
   * - Testes acima executaram em tempo similar aos com CSS
   *
   * 3. Vantagens do XPath:
   * - Maior flexibilidade para navegar pela DOM
   * - Melhor para elementos sem classes/IDs únicos
   * - Permite busca por texto exato ou parcial
   * - Útil para estruturas HTML complexas
   *
   * 4. Recomendações:
   * - Use CSS quando possível (mais rápido/legível)
   * - XPath para casos específicos onde CSS é limitado
   * - Combine ambos conforme necessidade do projeto
   */
})