const {Pokemon} = require('./../db/sequelizeManager')
const authJWT = require('./../auth/auth')

module.exports = (app, baseApiUrl) => {
    app.get(`${baseApiUrl}/:id`, authJWT,async (req, res) => {
        try{
            const pokemon = await Pokemon.findByPk(req.params.id);
            const message = pokemon !== undefined ? "The pokemon has been found." : "The pokemon has not been found."
            res.json({message, data:pokemon})
        } catch(error) {
            const message = "The pokemon cannot be retrieved. Try again in a few moments."
            res.status(500).json({message, data: error})
        }
    })
}