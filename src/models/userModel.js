module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:  {
                msg: "The username already exists."
            }
        },
        password: {
            type: DataTypes.STRING
        }
    })
}