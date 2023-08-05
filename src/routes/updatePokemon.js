const {Pokemon} = require('./../db/sequelizeManager')

module.exports = (app, baseApiUrl) => {
    app.put(`${baseApiUrl}/:id`, async (req, res) => {
        try{
            await Pokemon.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            const pokemonUpdated = await Pokemon.findByPk(req.params.id)
            if(pokemonUpdated === null){
                const message = "The pokemon doesn't exists. Try again with an other id."
                res.status(404).json({message})
            }
            const message = `The pokemon id=${pokemonUpdated.id} has been edited with success.`
            res.json({message, data:pokemonUpdated})

        } catch(error) {
            const message = "The pokemon cannot be updated. Try again in a few moments."
            res.status(500).json({message, data: error})
        }
    })
}