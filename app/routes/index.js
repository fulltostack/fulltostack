const Responder = require('../../lib/expressResponder')

function initRoutes (app) {
  app.get('/', (req, res) => {
    Responder.success(res, 'Server Started')
  })
}

module.exports = initRoutes
