const express = require('express')
const path = require('path')
const ejs = require('ejs')
const {connectMongo} = require('./mongoose')
const User = require('./models/users')
const {pool} = require('./pg')

connectMongo()

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/api/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

app.get('/ping', async (req, res) => {
    const result = await pool.query(`SELECT NOW()`)
    res.send({
        message: result.rows[0].now
    })
})

app.get('/profile', (req, res) => {
    res.render('profile', {
        name: 'Juanito',
        age: 30
    })
})

app.use(express.static('public'))

app.listen(process.env.PORT || 3000)
console.log('Servidor en puerto', process.env.PORT || 3000)