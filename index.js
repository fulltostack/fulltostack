require('dotenv').config()

const app = require('./lib')

app.start()
  .then(message => {
    console.log(message) // eslint-disable-line no-console
  })
  .catch(error => {
    console.error(error) // eslint-disable-line no-console
  })
