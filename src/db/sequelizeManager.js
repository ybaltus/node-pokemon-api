const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require("./../models/pokemonModel");
const UserModel = require('./../models/userModel')
const pokemons = require("./../db/mocks/mocks-pokemons");
const bcrypt = require('bcrypt')

// Init ORM sequelize
const sequelize = new Sequelize('pokedex', 'userdev', 'userdev1990', {
    host: 'localhost',
    dialect: 'mariadb'
});

const _connectionDB  = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes)

const initDB = async() => {
    try{
        // Connection db
        _connectionDB();

        // Syncronize db with sequelize
        await sequelize.sync({ force: true });
        console.log("The database \"pokedex\" has been synchronized.")

        // Insert the mocks-pokemons datas
        pokemons.map(async pokemon => {
            const newPokemon = await Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            })
        })

        // Insert a user
        const password = await bcrypt.hash('password', 10)
        const newUser = await User.create({
            username: 'userTest',
            password: password
        });

    } catch (error) {
        console.error('Unable to synchronize the database :', error);
    }
};

module.exports = {
    initDB,
    Pokemon,
    User
}
