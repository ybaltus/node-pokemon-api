const express = require('express')
const { success } = require('./helpers/helper')
const morgan = require('morgan')
const favicon = require('serve-favicon')
var path = require('path')
let pokemons = require('./mocks/mocks-pokemons')

// Config
const app = express()
const port = 3000
const baseApiUrl = '/api/v1'

// Middleware Logger
// app.use((req, res, next) => {
//     console.log(`URL : ${req.url}`)
//     next()
// })

// Middleware Morgan (Logger)
app.use(morgan('dev'))

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'icons', 'favicon.ico')))

// Homepage
app.get('/', (req, res) => {
    res.send('Hello from Express!')
})

// Get pokemon by id
app.get(`${baseApiUrl}/pokemon/:id`, (req, res) => {
    const idPokemon = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === idPokemon)
    const message = pokemon !== undefined ? "The pokemon has been found." : "The pokemon has not been found."
    res.json(success(message, pokemon));
})

// Get all pokemons
app.get(`${baseApiUrl}/pokemons`, (req, res) => {
    const message = pokemons.length > 0 ? "The list of pokemons has been found." : "The list of pokemons has not been found."
    res.json(success(message, pokemons))
})


app.listen(port, () => {
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)
})