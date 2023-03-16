const indexRouter = require('./index.router')

function route(app){
    app.use('/', indexRouter)
}

module.exports = route