const express = require('express')
// const { success, getUniqueId } = require('./src/helpers/helper')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const {initDB} = require('./src/db/sequelizeManager')
let path = require('path')
const morgan = require("morgan");
// let pokemons = require('./src/db/mocks/mocks-pokemons')

// Config
const app = express()
const port = process.env.PORT || 3000
const baseApiUrl = '/api/v1/pokemons'

// Init DB
initDB();

// Middleware Morgan (Logger)
if(process.env.NODE_ENV === 'development'){
    const morgan = require('morgan')
    app.use(morgan('dev'))
}

// Middleware Serve-Favicon
app.use(favicon(path.join(__dirname, 'public', 'icons', 'favicon.ico')))

// Middleware Body-Parser
app.use(bodyParser.json());

// Homepage
require('./src/routes/homepage')(app)
// app.get('/', (req, res) => {
//     res.send('Hello from Express!')
// })

// Get all pokemons
require('./src/routes/findAllPokemons')(app, baseApiUrl)
// app.get(`${baseApiUrl}/pokemons`, (req, res) => {
//     const message = pokemons.length > 0 ? "The list of pokemons has been found." : "The list of pokemons has not been found."
//     res.json(success(message, pokemons))
// })

// Get pokemon by id
require('./src/routes/findPokemonByPk')(app, baseApiUrl)
// app.get(`${baseApiUrl}/pokemon/:id`, (req, res) => {
//     const idPokemon = parseInt(req.params.id);
//     const pokemon = pokemons.find(pokemon => pokemon.id === idPokemon)
//     const message = pokemon !== undefined ? "The pokemon has been found." : "The pokemon has not been found."
//     res.json(success(message, pokemon));
// })

// Add new pokemon
require('./src/routes/createPokemon')(app, baseApiUrl)
// app.post(`${baseApiUrl}/pokemons`, (req, res) => {
//     const id = getUniqueId(pokemons);
//     const newPokemon = {...req.body, ...{id: id, created: new Date()}}
//     pokemons.push(newPokemon)
//     const message = `The new pokemon ${newPokemon} has ben added with success.`
//     res.json(success(message, newPokemon))
// })

// Update a pokemon
require('./src/routes/updatePokemon')(app, baseApiUrl)
// app.put(`${baseApiUrl}/pokemon/:id`, (req, res) => {
//     const idPokemon = parseInt(req.params.id)
//     const pokemonUpdated = {...req.body, id: idPokemon, updated: new Date()}
//     pokemons = pokemons.map(pokemon => {
//         return pokemon.id === idPokemon ? pokemonUpdated : pokemon
//     })
//     const message = `The pokemon ${pokemonUpdated} has ben edited with success.`
//     res.json(success(message, pokemonUpdated))
// })

// Delete a pokemon
require('./src/routes/deletePokemon')(app, baseApiUrl)
// app.delete(`${baseApiUrl}/pokemon/:id`, (req, res) => {
//     const idPokemon = parseInt(req.params.id)
//     const pokemonToDelete = pokemons.find(pokemon => pokemon.id === idPokemon)
//     pokemons = pokemons.filter(pokemon => pokemon.id !== idPokemon)
//     const message = `The pokemon ${pokemonToDelete.name} has ben deleted with success.`
//     res.json(success(message, pokemonToDelete))
// })

// Login
require('./src/routes/login')(app, baseApiUrl)

// Middleware errors
app.use(({res}) => {
    const message = "Unable to find the ressource requested. try another URL."
    res.status(404).json({message})
})

app.listen(port, () => {
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)
})