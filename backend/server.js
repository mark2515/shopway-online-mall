const express = require('express')
const products = require('./data/products')

const app = express()

app.get('/', (req, res) => {
    res.send('The server is running')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(product => product._id === req.params.id)
    res.json(products)
})

app.listen(5000, console.log('The server is running on port 5000'))