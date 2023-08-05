const {Pokemon} = require('./../db/sequelizeManager')

module.exports = (app, baseApiUrl) => {
    app.post(`${baseApiUrl}`, async (req, res) => {
        const newPokemon = await Pokemon.create(req.body);
        const message = `The new pokemon ${newPokemon} has ben added with success.`
        res.json({message, data:newPokemon})
    })
}