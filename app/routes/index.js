function initRoutes (app) {
  app.get('/', (req, res) => {
    res.end('Server Started')
  })
}

module.exports = initRoutes
