const {Pokemon} = require('./../db/sequelizeManager')

module.exports = (app, baseApiUrl) => {
    app.get(`${baseApiUrl}`, async (req, res) => {
        const pokemons = await Pokemon.findAll();
        const message = pokemons.length > 0 ? "The list of pokemons has been retrieved." : "The list of pokemons is empty."
        res.json({message, data:pokemons})
    })
}