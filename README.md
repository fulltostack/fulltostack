# Problem Statement
- [Link](Problem.md)

## Directory Structure
- `app` - Segregates the application related codebase
- `app/models` - Contains Database Models
- `app/models/index.js` - Configures Database
- `app/routes` - Contains Express Routes
- `app/routes/index.js` - Configures Base Express Routes
- `lib` - Contains wrapper over other standard libraries
- `lib/express.js` - Wrapper above express module
- `lib/index.js` - Provide functionality to initialize the app
- `lib/logger.js` - Wrapper above winston module
- `lib/sequelize.js` - Wrapper above sequelize module
- `lib/shutdown.js` - Provides functionality to gracefully shutdown the server
- `.env` - Configs for the application. Note: DB_PASSWORD is kept in config only for demonstration purposes.
- `.eslintrc` - Defines rules for Linting
- `.gitignore` - File not to be pushed to git
- `index.js` - Starting point of the application
- `package-lock.json` - Manages Dependency Tree to maintain similar identical trees.
- `package.json` - Describes some metadata related to project, like version, dependencies, author, etc.
- `Problem.md` - Original Problem Statement
- `README.md` - Contains steps for setup and other information about the solution
