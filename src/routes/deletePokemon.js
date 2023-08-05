const {Pokemon} = require('./../db/sequelizeManager')

module.exports = (app, baseApiUrl) => {
    app.delete(`${baseApiUrl}/:id`, async (req, res) => {
        try{
            const id = req.params.id
            const PokemonToDeleted = await Pokemon.findByPk(id)
            if(PokemonToDeleted === null){
                const message = "The pokemon doesn't exists. Try again with an other id."
                res.status(404).json({message})
            }
            await Pokemon.destroy({
                where: {
                    id: id
                }
            })
            const message = `The pokemon ${PokemonToDeleted.name} has been deleted with success.`
            res.json({message, data: PokemonToDeleted})
        }catch (error) {
            const message = "The pokemon cannot be deleted. Try again in a few moments."
            res.status(500).json({message, data: error})
        }
    })
}