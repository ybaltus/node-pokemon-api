const {Pokemon} = require('./../db/sequelizeManager')

module.exports = (app, baseApiUrl) => {
    app.delete(`${baseApiUrl}/:id`, async (req, res) => {
        const id = req.params.id
        const PokemonToDeleted = await Pokemon.findByPk(id)
        await Pokemon.destroy({
            where: {
                id: id
            }
        })
        const message = `The pokemon ${PokemonToDeleted.name} has been deleted with success.`
        res.json({message, data: PokemonToDeleted})
    })
}