import HomePage from "../../../pageObjects/HomePage";
import ProductPage from "../../../pageObjects/ProductsPage";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const homePage = new HomePage()
const productPage = new ProductPage()

Given('I open ECommerce Page', ()=>
{
    cy.visit(Cypress.env('url')+"/angularpractice/")
})

When('I add items to cart', function ()
{
    homePage.getShopTab().click()
    this.data.productName.forEach(function (element) {

        cy.selectProduct(element)
      });
      productPage.checkOutButton().click()
})

Then('Validate the total prices', ()=>
{
    var sum = 0

    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {

      const amount = $el.text()
      var res = amount.split(" ")
      res = res[1].trim()
      sum = Number(sum) + Number(res)

    }).then(function () {
      cy.log(sum)
    })
    cy.get('h3 strong').then(function (element) {
      const amount = element.text()
      var res = amount.split(" ")
      var total = res[1].trim()
      expect(Number(total)).to.equal(sum)
    })

})

Then('select the country submit and verify Thankyou', ()=>
{
    cy.contains('Checkout').click()
    cy.get('#country').type('India')
    cy.get('.suggestions > ul > li > a', { timeout: 10000 }).should('be.visible')
    cy.get('#checkbox2').click({ force: true })
    cy.get('input[type="submit"]').click() 
    cy.get('.alert').then(function (element) {

      const actualText = element.text()
      expect(actualText.includes("Success")).to.be.true

    })

})

When('I fill the form details', function(dataTable)
{

    name = dataTable.rawTable[1][0]  
    homePage.getEditBox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])

    
})

Then('validate the forms behaviour', function()
{
    homePage.getTwoWayDataBinding().should('have.value', name)
    homePage.getEditBox().should('have.attr', 'minlength', '2')
})

Then('select the Shop Page', ()=>
{
    homePage.getShopTab().click()
})





