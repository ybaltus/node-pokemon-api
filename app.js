const express = require('express')
const { success, getUniqueId } = require('./helpers/helper')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
let path = require('path')
let pokemons = require('./mocks/mocks-pokemons')

// Config
const app = express()
const port = 3000
const baseApiUrl = '/api/v1'

// Middleware Morgan (Logger)
app.use(morgan('dev'))

// Middleware Serve-Favicon
app.use(favicon(path.join(__dirname, 'public', 'icons', 'favicon.ico')))

//Body-Parser
app.use(bodyParser.json());

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

// Add new pokemon
app.post(`${baseApiUrl}/pokemons`, (req, res) => {
    const id = getUniqueId(pokemons);
    const newPokemon = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(newPokemon)
    const message = `The new pokemon ${newPokemon} has ben added with success.`
    res.json(success(message, newPokemon))
})

// Update a pokemon
app.put(`${baseApiUrl}/pokemon/:id`, (req, res) => {
    const idPokemon = parseInt(req.params.id)
    const pokemonUpdated = {...req.body, id: idPokemon, updated: new Date()}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === idPokemon ? pokemonUpdated : pokemon
    })
    const message = `The pokemon ${pokemonUpdated} has ben edited with success.`
    res.json(success(message, pokemonUpdated))

})

// Delete a pokemon
app.delete(`${baseApiUrl}/pokemon/:id`, (req, res) => {
    const idPokemon = parseInt(req.params.id)
    const pokemonToDelete = pokemons.find(pokemon => pokemon.id === idPokemon)
    pokemons = pokemons.filter(pokemon => pokemon.id !== idPokemon)
    const message = `The pokemon ${pokemonToDelete.name} has ben deleted with success.`
    res.json(success(message, pokemonToDelete))
})

app.listen(port, () => {
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)
})