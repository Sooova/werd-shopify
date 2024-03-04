### Task One
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

### Task Two