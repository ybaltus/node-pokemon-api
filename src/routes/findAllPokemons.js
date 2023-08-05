const {Pokemon} = require('./../db/sequelizeManager')

module.exports = (app, baseApiUrl) => {
    app.get(`${baseApiUrl}`, async (req, res) => {
        try{
            const pokemons = await Pokemon.findAll();
            const message = pokemons.length > 0 ? "The list of pokemons has been retrieved." : "The list of pokemons is empty."
            res.json({message, data:pokemons})
        }catch (error) {
            const message = "The list of pokemons cannot be retrieved. Try again in a few moments."
            res.status(500).json({message, data: error})
        }
    })
}