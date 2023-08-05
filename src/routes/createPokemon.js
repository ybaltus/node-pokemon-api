const {Pokemon} = require('./../db/sequelizeManager')
const {ValidationError, UniqueConstraintError} = require("sequelize");

module.exports = (app, baseApiUrl) => {
    app.post(`${baseApiUrl}`, async (req, res) => {
        try{
            const newPokemon = await Pokemon.create(req.body);
            const message = `The new pokemon ${newPokemon} has ben added with success.`
            res.json({message, data:newPokemon})
        }catch (error){
            if(error instanceof ValidationError || error instanceof UniqueConstraintError) {
                return res.status(400).json({message: error.message, data: error})
            }

            const message = "The pokemon cannot be added. Try again in a few moments."
            res.status(500).json({message, data: error})
        }
    })
}