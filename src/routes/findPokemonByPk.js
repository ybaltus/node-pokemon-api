const {Pokemon} = require('./../db/sequelizeManager')

module.exports = (app, baseApiUrl) => {
    app.get(`${baseApiUrl}/:id`, async (req, res) => {
        const pokemon = await Pokemon.findByPk(req.params.id);
        const message = pokemon !== undefined ? "The pokemon has been found." : "The pokemon has not been found."
        res.json({message, data:pokemon})
    })
}