const express = require('express')
const path = require('path')
const app = express()
express.static('public')

// TODO make a general calls for HTML and JS files instead of this

app.get('/HomePage.html', function (req, res) {
    res.sendFile('/static/html/HomePage.html', {root: __dirname})
})

app.get('/HomePage.js', (req, res) => {
    res.sendFile('/scripts/HomePage.js', {root: __dirname});
});

app.get('/Index.html', function (req, res) {
    res.sendFile('/static/html/Index.html', {root: __dirname})
})

app.get('/Index.js', (req, res) => {
    res.sendFile('/scripts/Index.js', {root: __dirname});
});

app.get('/ShoppingCart.html', function (req, res) {
    res.sendFile('/static/html/ShoppingCart.html', {root: __dirname})
})

app.get('/ShoppingCart.js', (req, res) => {
    res.sendFile('/scripts/ShoppingCart.js', {root: __dirname});
});

app.get('/Store.html', function (req, res) {
    res.sendFile('/static/html/Store.html', {root: __dirname})
})

app.get('/Store.js', (req, res) => {
    res.sendFile('/scripts/Store.js', {root: __dirname});
});
// app.use('/',express.static(path.join(__dirname + '/scripts/HomePage.js')))

module.exports = app