const {Pokemon} = require('./../db/sequelizeManager')

module.exports = (app, baseApiUrl) => {
    app.put(`${baseApiUrl}/:id`, async (req, res) => {
        await Pokemon.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        const pokemonUpdated = await Pokemon.findByPk(req.params.id)
        const message = `The pokemon id=${pokemonUpdated.id} has been edited with success.`
        res.json({message, data:pokemonUpdated})
    })
}