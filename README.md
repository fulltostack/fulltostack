
# Problem Statement

-  [Link](Problem.md)

  

## Postman Collection

-  `https://www.getpostman.com/collections/f6375bba2041c1c5d888`

  ## Run Project
  - Run `npm install` in project root folder
  - Run `npm start` in project root folder
  - App will run on 3001 port
  - Run `npm install` in ui/ folder
  - Run `npm start` in ui/ folder
  - UI will show in `localhost:3000`

## Directory Structure

-  `app` - Segregates the application related codebase

-  `app/controllers` - Defines Controller Function

-  `app/controllers/user.js` - Defines Controller Function related to User

-  `app/controllers/wallet.js` - Defines Controller Function related to Wallet

-  `app/controllers/transaction.js` - Defines Controller Function related to Transactions

-  `errors` - Contains custom error functions to stick to RESTful responses

-  `errors/base` - Base class for Custom Function

-  `errors/badRequestError` - Encapsulates 400 Bad Request Error

-  `errors/authenticationError` - Encapsulates 401 Authentication Error

-  `app/models` - Contains Database Models

-  `app/models/user.js` - User Database Model

-  `app/models/index.js` - Configures Database

-  `app/models/transaction.js` - Tranasction Database Model

-  `app/routes` - Contains Express Routes

-  `app/routes/user.js` - Configures User specific Routes

-  `app/routes/index.js` - Configures Base Express Routes

-  `app/routes/wallet.js` - Configures Wallet specific Routes

-  `app/routes/transaction.js` - Configures Transaction specific Routes

-  `app/validations` - Contains Joi specification validation rules to validate incoming request body

-  `app/validations/schma.js` - Defines schemas specific to application

-  `app/validations/extenstions.js` - Defines custom Joi extensions

-  `utils.js` - Provides utility functions

-  `lib` - Contains wrapper over other standard libraries

-  `lib/express.js` - Wrapper above express module

-  `lib/expressResponder` - Wrapper which makes sure that the API responses are RESTful

-  `lib/index.js` - Provide functionality to initialize the app

-  `lib/logger.js` - Wrapper above winston module

-  `lib/passport.js` - Wrapper above passport module, to add authentication layer to application

-  `lib/sequelize.js` - Wrapper above sequelize module

-  `lib/shutdown.js` - Provides functionality to gracefully shutdown the server

-  `migrations` - Contains database migrations

-  `ui` - Contains Reactjs codebase

-  `.env` - Configs for the application. Note: DB_PASSWORD, PASSWORD_SALT and JWT_SECRET is kept in config only for demonstration purposes.

-  `.eslintrc` - Defines rules for Linting

-  `.gitignore` - File not to be pushed to git

-  `.sequlizerc` - Defines configurations for sequelize CLI

-  `index.js` - Starting point of the application

-  `package-lock.json` - Manages Dependency Tree to maintain similar identical trees.

-  `package.json` - Describes some metadata related to project, like version, dependencies, author, etc.

-  `Problem.md` - Original Problem Statement

-  `README.md` - Contains steps for setup and other information about the solution

  

## Sample API Responses

```

GET /_ping

{

"result": "Ping Received!!!"

}

  

{unknown-endpoint}

{

"reason": "Not Found"

}

  

POST /users/signup

{

"name": "Peter",

"email": "peter@yopmail.com"

}

  

POST /users/signin

{

"token": "token_string",

"expiresIn": 1800

}

  

POST /wallets/eth

{

"email": "peter@yopmail.com",

"eth_address": "0xbbf5029fd710d227630c8b7d338051b8e76d50b3",

"eth_balance": 123456

}

  

POST /wallets/btc

{

"email": "peter@yopmail.com",

"btc_address": "3QrpV6j1boaCcydvXfkvG7LxBxegB9HLp5",

"btc_balance": 123456

}

  

POST /transactions

{

"transaction_id": 2,

"state": "PENDING",

"from_address": "0xbbf5029fd710d227630c8b7d338051b8e76d50b2",

"to_address": "0xbbf5029fd710d227630c8b7d338051b8e76d50b3",

"currency_amount": 10

}

  

GET /transactions?page&count

{

"transactions": [

{

"id": 1,

"state": "PENDING",

"currency_amount": "10.000000000000000000",

"currency_type": "BTC",

"from_address": "3QrpV6j1boaCcydvXfkvG7LxBxegB9HLp5",

"to_address": "1MvYASoHjqynMaMnP7SBmenyEWiLsTqoU6",

"transaction_type": "INBOUND"

}

],

"page": 1,

"max_page": 1,

"fetched_transactions": 1,

"total_transactions": 1

}

  

GET /transactions/:id/status

{

"id": 1,

"state": "PENDING",

"currency_amount": "10.000000000000000000",

"currency_type": "BTC",

"from_address": "3QrpV6j1boaCcydvXfkvG7LxBxegB9HLp5",

"to_address": "1MvYASoHjqynMaMnP7SBmenyEWiLsTqoU6",

"transaction_type": "INBOUND"

}

  

GET /users/me

{

"name": "Peter",

"email": "peter@yopmail.com",

"btc_address": "3QrpV6j1boaCcydvXfkvG7LxBxegB9HLp5",

"btc_balance": "10000.00000000",

"eth_address": null,

"eth_balance": "0.000000000000000000",

"transaction_max": "10.000000000000000000"

}

```