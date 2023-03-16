const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const session = require('express-session')

const pathview = path.join(__dirname, '/views')
const pathhbs = path.join(__dirname, '/views/partials')

const route = require('./routes/router')
const { engine } = require('express-handlebars')
const router = require('./routes/index.router')

hbs.registerPartials(pathhbs)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('view engine', 'hbs')
app.set('views', pathview)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use(session({
    secret: "123321",
    resave: false,
    saveUninitialized: false,
    secure: false
}))


route(app)

app.listen(3000)