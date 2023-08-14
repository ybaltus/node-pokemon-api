const {Pokemon} = require('./../db/sequelizeManager')
const {Op} = require('sequelize')
const authJWT = require('./../auth/auth')

module.exports = (app, baseApiUrl) => {
    app.get(`${baseApiUrl}`, authJWT, async (req, res) => {
        try{
            let pokemons;
            let message;
            let limit = parseInt(req.query.limit) || 5

            if(req.query.name) {
                // Search by name
                const name = req.query.name;

                if(name.length <2) {
                    const message = "The name params will be contains at least 3 letters"
                    return res.status(400).json({message})
                }

                const {count, rows} = await Pokemon.findAndCountAll({
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    order: ['name'],
                    limit: limit
                })
                pokemons = rows
                message = pokemons.length > 0 ? `There are ${pokemons.length}/${count} pokemon(s) with name = ${name}`: "The list of pokemons is empty."
            } else {
                // Get all
                pokemons = await Pokemon.findAll({order: ['name'], limit: limit});
                message = pokemons.length > 0 ? "The list of pokemons has been retrieved." : "The list of pokemons is empty."
            }
            res.json({message, data:pokemons})
        }catch (error) {
            const message = "The list of pokemons cannot be retrieved. Try again in a few moments."
            res.status(500).json({message, data: error})
        }
    })
}