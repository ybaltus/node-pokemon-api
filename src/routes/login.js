const { User} = require('./../db/sequelizeManager')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('./../auth/private_key')

module.exports =  (app, baseApiUrl) => {
    app.post(`${baseApiUrl}/login`, async (req, res) => {
        try{
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
            if(!user){
                const message = "The user doesn't exists.";
                return res.status(404).json({message})
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if(!isPasswordValid){
                const message = "Password invalid. Verify your password."
                return res.status(401).json({message})
            }

            // Generate JWT
            const token = jwt.sign(
                {userId: user.id},
                privateKey,
                {expiresIn: '3h'}
            )

            const message = "User login successful."
            res.json({message, data: user, token})
        } catch(error) {
            const message = "Authentication failed. Try again in a few moments."
            res.status(500).json({message, data: error})
        }

    })
}