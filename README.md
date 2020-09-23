# PlantStock

[![Build Status](https://travis-ci.com/Edward-Phillips/plantStock.svg?branch=plantStock)](https://travis-ci.com/Edward-Phillips/plantStock)

[![Coverage Status](https://coveralls.io/repos/github/Edward-Phillips/plantStock/badge.svg)](https://coveralls.io/github/Edward-Phillips/plantStock)

[![Maintainability](https://api.codeclimate.com/v1/badges/35be65ea2ae5dd89f775/maintainability)](https://codeclimate.com/github/Edward-Phillips/plantStock/maintainability)


This repo is designed to be a backend for a stock/CRM system for plant cuttings.

To see what is currently being worked on, [checkout the trello board!](https://trello.com/b/viyg5PqG/merry-site)

## user stories

The following user stories are the basis for this project:

```
  As a User,
  So that I can track my stock,
  I want to have a form where I can record my stock purchases.

  As a user,
  So that I can manage my current stock,
  I want to be able to see a table of all my currently stocked items

  As a user,
  So that I can manage my stock,
  I want to be able to enter in orders and reduce my current stock by the ordered amount.

  As a user,
  So that I don't send the seame cutting to my customers,
  I want to be given a shortlist of in-stock cuttings that the customer has not received.
```

The MVP for this project is the first two user stories, a stock management system.

# Set Up

To set up first clone this repo, then run npm install, you will need to add two environmental variables in a .env file -

```
TEST_ENV_VARIABLE="Environment variable is coming across"
CONNECTION_STRING=put-your postgresql-database-url here
```

after that you need to run: `yarn runQuery` to create the tables - currently the SQL statement to create the tables is located in src/utils/queries.js, so if you want to edit the table structure that's the place to start.  
WARNING - this command will also inject some example data into the tables, so if you actually want to use this be sure to remove those lines/truncate the tables afterwards.

The last command to run is yarn startdev and you should have a server listening on 3000.



# '/v1' MVP Endpoints

## /products
GET  -- returns a Json object such as the below:

```
{
  "products": [
    {
      "product_name": "Philodendron Squamiferum",
      "price": "3",
      "cutting_type": "rooted"
    },
    {
      "product_name": "Philodendron Squamiferum",
      "price": "1.5",
      "cutting_type": "unrooted"
    }
  ]
}
```

POST -- the request body is expected to contain:

- product_name: VARCHAR(255) - the name of the plant
- cutting_type: VARCHAR(255) - either 'rooted' or 'unrooted'
- Price: NUMERIC = either 1.50 or 3.00 depending on cutting type

PUT -- the request body is expected to contain:

- old_product_name: VARCHAR(255) - the current name of the product to be changed
- old_cutting_type: VARCHAR(255) - the current cutting type of the product to be changed
- product_name: VARCHAR(255) - the new name of the product
- price: NUMERIC - the new price of the product
- cutting_type: VARCHAR(255) - the new cutting type

DELETE  -- the request body is expected to contain:

- product_name: VARCHAR(255) - the name of the product to be deleted
- cutting_type: VARCHAR(255) - the cutting typew of the product to be deleted
- price: NUMERIC - the price of the product to be deleted


## /stock

GET  -- returns a Json object such as the below:

```
{
  "stock": [
    {
      "product_name": "Philodendron Squamiferum",
      "product_id": 1,
      "cost_per_cutting": "0.35",
      "cutting_type": "rooted"
      "current_count": 25,
      "last_updated": null
    }
  ]
}
```

POST -- the request body is expected to contain:

- product_name: VARCHAR(255) - the product name of the stock being added
- cutting_type: VARCHAR(255) - either 'rooted' or 'unrooted'
- cost_per_cutting: NUMERIC - the amount paid for the full plant divided by the number of cuttings
- current_count: NUMERIC - the number of cuttings being entered into stock

PUT -- the request body is expected to contain:

- product_name: VARCHAR(255) - the product name of the stock being edited
- cutting_type: VARCHAR(255) - either 'rooted' or 'unrooted'
- cost_per_cutting: NUMERIC - the amount paid for the full plant divided by the number of cuttings
- new_count: NUMERIC - the new count of the stock

