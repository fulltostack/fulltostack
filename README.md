# Problem Statement
- [Link](Problem.md)

## Postman Collection
- `https://www.getpostman.com/collections/f6375bba2041c1c5d888`

## Directory Structure
- `app` - Segregates the application related codebase
- `app/controllers` - Defines Controller Function
- `app/controllers/user.js` - Defines Controller Function related to User
- `app/controllers/wallet.js` - Defines Controller Function related to Wallet
- `app/controllers/transaction.js` - Defines Controller Function related to Transactions
- `errors` - Contains custom error functions to stick to RESTful responses
- `errors/base` - Base class for Custom Function
- `errors/badRequestError` - Encapsulates 400 Bad Request Error
- `errors/authenticationError` - Encapsulates 401 Authentication Error
- `app/models` - Contains Database Models
- `app/models/user.js` - User Database Model
- `app/models/index.js` - Configures Database
- `app/models/transaction.js` - Tranasction Database Model
- `app/routes` - Contains Express Routes
- `app/routes/user.js` - Configures User specific Routes
- `app/routes/index.js` - Configures Base Express Routes
- `app/routes/wallet.js` - Configures Wallet specific Routes
- `app/routes/transaction.js` - Configures Transaction specific Routes
- `app/validations` - Contains Joi specification validation rules to validate incoming request body
- `app/validations/schma.js` - Defines schemas specific to application
- `app/validations/extenstions.js` - Defines custom Joi extensions
- `utils.js` - Provides utility functions
- `lib` - Contains wrapper over other standard libraries
- `lib/express.js` - Wrapper above express module
- `lib/expressResponder` - Wrapper which makes sure that the API responses are RESTful
- `lib/index.js` - Provide functionality to initialize the app
- `lib/logger.js` - Wrapper above winston module
- `lib/passport.js` - Wrapper above passport module, to add authentication layer to application
- `lib/sequelize.js` - Wrapper above sequelize module
- `lib/shutdown.js` - Provides functionality to gracefully shutdown the server
- `migrations` - Contains database migrations
- `.env` - Configs for the application. Note: DB_PASSWORD, PASSWORD_SALT and JWT_SECRET is kept in config only for demonstration purposes.
- `.eslintrc` - Defines rules for Linting
- `.gitignore` - File not to be pushed to git
- `.sequlizerc` - Defines configurations for sequelize CLI
- `index.js` - Starting point of the application
- `package-lock.json` - Manages Dependency Tree to maintain similar identical trees.
- `package.json` - Describes some metadata related to project, like version, dependencies, author, etc.
- `Problem.md` - Original Problem Statement
- `README.md` - Contains steps for setup and other information about the solution
