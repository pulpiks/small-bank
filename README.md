# Commands:

Run frontend:
- yarn start - run webpack-dev-server

Run backend:
- yarn develop - run tsc in watch mode
- yarn startDevelop - run server
- yarn test  - run unit-tests for services and API
- yarn test-api - run tests for API


Endpoints: 


## Request Create customers:
curl -X "POST" "http://localhost:8080/small-bank/add_customers" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'[
  {
    "name": "Kseniia",
    "surname": "Lvova"
  },
  {
    "name": "Tom",
    "surname": "Cruise"
  },
  {
    "name": "Harry",
    "surname": "Johnson"
  },
  {
    "name": "Leonardo",
    "surname": "DiCaprio"
  }
]'

## Create transaction for account
curl -X "POST" "http://localhost:8080/small-bank/transaction/create" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "initialCredit": 50,
  "customerID": "b5ed7101-42bd-11e9-8700-6346c501510c"
}'


## Get related info to customer ID
curl "http://localhost:8080/small-bank/customer/:customerrID/relations"





