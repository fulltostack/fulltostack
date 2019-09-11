require('dotenv').config()

const app = require('./lib')

app.start()
  .then(message => {
    app.logger.info(message)
  })
  .catch(error => {
    app.logger.error(error)
  })
