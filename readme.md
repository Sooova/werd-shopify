# Task One
Interestingly, this is not something I had ever done before, I've actually never had the opportunity to work with the new checkout extensibility feature, so it was interesting.

I just scoured through the API and found: 
- https:/ /shopify.dev/docs/apps/checkout/styling#custom-fonts 

Which seemed to be what i was after. I just had to install the GRAPHQL playground on the admin backend, and run the query:

```
mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
  checkoutBrandingUpsert(
    checkoutBrandingInput: $checkoutBrandingInput
    checkoutProfileId: $checkoutProfileId
  ) {
    checkoutBranding {
      customizations {
        headingLevel2 {
          typography {
            size
            letterCase
            weight
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

with variables:

```
{
  "checkoutProfileId": "gid://shopify/CheckoutProfile/58949921",
  "checkoutBrandingInput": {
    "customizations": {
      "headingLevel2": {
        "typography": {
          "size": "LARGE",
          "letterCase": "UPPER",
          "weight": "BOLD"
        }
      }
    }
  }
}
```

I actually ran into a road block and got sent down a rabbit whole, because one of the test stores i made didn't have the extensibility, and it kept saying i didn't have the access when attempting to run the query, so that ate up a lot of time....

# Task Two
I cloned this: 
- https://github.com/Shopify/function-examples/tree/main/sample-apps/payment-customizations

Which according to the documentation, is a good baseline for using shopify functions to edit the checkout. 

I hit a few roadblocks, the first of which was a rust related issue. I quickly set up rust on my local machine, however this turned out to be moot, as i am only using JS to implement my payment customisation, so i have sinced removed the rust function from the repo. 

Some other roadsblocks was a bit of confusion with the object structure of cart.lines, as i assumed that cart.lines.id would be the product ID so got stuck here for a little while. But found out quickly that through the partner dashboard, I am able to see debug logs for the application, and found the issue, and ammended the code accordingly. 

## Ammending functionality
To ammend the cloned repo to the required functionality i had to:

- change the run.graphql file to include cart line item nodes to access
- change the code in run.js to check for a specific product ID in cart, if so, hide the payment method. (I intially hard coded these values in as seen in prior commits to get the functionalty correct first)
- change the front-end portion in both the app dashboard as well as the payment customisation form which takes in the payment method name and productID

## Screengrabs
### Dashboard
<img src="https://i.imgur.com/iq7bNBy.png"/>

### Payment Customisation
<img src="https://i.imgur.com/3OpVbgn.png"/>

### Data Form
<img src="https://i.imgur.com/oBE8naz.png">

### Expected Result
Removal of afterpay payment method

<img src="https://i.imgur.com/vvvOYp0.png">
